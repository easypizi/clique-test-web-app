import React, { useCallback, useEffect, useMemo } from 'react';
import store from 'store2';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Fade,
  Grow
} from '@mui/material';

import { getUser } from '../../store/actions/userActions';
import { getUserSpaces, getSpace } from '../../store/actions/spaceActions';

import LinkButton from '../../components/LinkButton/LinkButton';

function AuthorizationPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const storedUserId = store.session.get('userId');
  const storedPrivateId = store.session.get('privateId');
  const userId = queryParams.get('user_id') ?? storedUserId;
  const privateId = queryParams.get('private_id') ?? storedPrivateId;

  const [space, setSpaceButton] = React.useState('');

  const { currentUser, isUserDataLoading } = useSelector(
    (state) => state.currentUser
  );
  const { userSpaces, isSpacesLoading } = useSelector((state) => state.spaces);

  const isLoading = useMemo(
    () => isUserDataLoading || isSpacesLoading,
    [isSpacesLoading, isUserDataLoading]
  );
  const userSpacesIds = useMemo(
    () => currentUser && currentUser.user_spaces,
    [currentUser]
  );
  const memoizedSpaces = useMemo(() => userSpaces, [userSpaces]);

  const clickHandler = useCallback(
    (id) => {
      dispatch(getSpace(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!storedUserId && userId) {
      store.session.set('userId', userId);
    }

    if (!storedPrivateId && privateId) {
      store.session.set('privateId', privateId);
    }
  }, [privateId, storedPrivateId, storedUserId, userId]);

  useEffect(() => {
    if (!currentUser) {
      dispatch(getUser(userId, privateId));
    }
  }, [currentUser, dispatch, privateId, userId]);

  useEffect(() => {
    if (userSpacesIds && userSpacesIds.length > 0 && !memoizedSpaces) {
      dispatch(getUserSpaces(userSpacesIds));
    }
  }, [dispatch, memoizedSpaces, userSpacesIds]);

  const handleChangeSpace = useCallback((event) => {
    setSpaceButton(event.target.value);
  }, []);

  const selectedSpace = useMemo(
    () =>
      memoizedSpaces &&
      memoizedSpaces.filter((item) => item.space_id === space),
    [memoizedSpaces, space]
  );

  const renderControlGroup = useCallback(() => {
    if (!isLoading && !memoizedSpaces) {
      return (
        <Box
          sx={{
            alignSelf: 'center',
            justifySelf: 'center',
            margin: 'auto 0'
          }}
        >
          <Fade
            in={!isLoading && !memoizedSpaces}
            style={{
              transitionDelay: !isLoading && !memoizedSpaces ? '300ms' : '0ms'
            }}
          >
            <div>
              <Typography align="center" variant="body1">
                You dont have any space to join...
              </Typography>
              <Typography align="center" variant="body1">
                Check your authorization in any chat of community or send /login
                command to the bot
              </Typography>
            </div>
          </Fade>
        </Box>
      );
    }

    const choosenSpace = selectedSpace ? selectedSpace[0] : null;

    return (
      <Box
        sx={{
          width: '100%',
          height: '300px',
          alignSelf: 'center',
          justifySelf: 'center',
          margin: 'auto 0'
        }}
      >
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="space-choose-select-label">Space</InputLabel>
          <Select
            fullWidth
            labelId="space-choose-select-label"
            id="space-choose-select"
            value={space}
            label="Space"
            onChange={handleChangeSpace}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {memoizedSpaces.map((spaceItem) => (
              <MenuItem key={spaceItem.space_id} value={spaceItem.space_id}>
                {spaceItem.space_name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose any space</FormHelperText>
        </FormControl>
        {choosenSpace && (
          <Box sx={{ marginTop: '20px' }}>
            <Grow in={!!choosenSpace}>
              <Typography
                sx={{ textAlign: 'center', marginBottom: '10px' }}
                variant="body2"
              >
                {choosenSpace.space_description}
              </Typography>
            </Grow>
            <Grow
              in={!!choosenSpace}
              style={{ transformOrigin: '0.5 0.5 0' }}
              {...(choosenSpace ? { timeout: 1000 } : {})}
            >
              <div>
                <LinkButton
                  fullWidth
                  to="/space"
                  onClick={() => clickHandler(choosenSpace.space_id)}
                >
                  Enter
                </LinkButton>
              </div>
            </Grow>
          </Box>
        )}
      </Box>
    );
  }, [
    clickHandler,
    handleChangeSpace,
    isLoading,
    memoizedSpaces,
    selectedSpace,
    space
  ]);

  return (
    <Container sx={{ height: '100%' }}>
      {isLoading && !userSpaces ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            sx={{ fontWeight: '400', textAlign: 'center' }}
            variant="h2"
          >
            Welcome!
          </Typography>
          <Typography
            sx={{ fontWeight: '300', textAlign: 'center' }}
            variant="h5"
          >
            Please, choose any community below to join:
          </Typography>
          {renderControlGroup()}
        </Box>
      )}
    </Container>
  );
}

export default AuthorizationPage;
