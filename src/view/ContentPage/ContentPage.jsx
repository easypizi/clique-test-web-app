import React, { useMemo, useEffect } from 'react';
import store from 'store2';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, CircularProgress, Box } from '@mui/material';

import { getUser } from '../../store/actions/userActions';
import { getUserSpaces } from '../../store/actions/spaceActions';

import TabNavigation from '../../components/TabNavigation/TabNavigation';
import Header from '../../components/Header/Header';

function ContentPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const storedUserId = store.session.get('userId');
  const storedPrivateId = store.session.get('privateId');
  const userId = queryParams.get('user_id') ?? storedUserId;
  const privateId = queryParams.get('private_id') ?? storedPrivateId;

  const { currentUser, isUserDataLoading, isAuthorized } = useSelector(
    (state) => state.user
  );
  const { userSpaces, isSpacesLoading } = useSelector((state) => state.spaces);

  const userSpacesIds = useMemo(
    () => currentUser && currentUser.user_spaces,
    [currentUser]
  );

  const isLoading = useMemo(
    () => isUserDataLoading || isSpacesLoading,
    [isSpacesLoading, isUserDataLoading]
  );

  // Effects
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
    if (userSpacesIds && userSpacesIds.length > 0 && !userSpaces) {
      dispatch(getUserSpaces(userSpacesIds));
    }
  }, [dispatch, userSpaces, userSpacesIds]);

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
        <Box sx={{ widht: '100%', height: '100%' }}>
          <Header />
          <TabNavigation
            user={{ ...currentUser, is_authorized: isAuthorized }}
          />
        </Box>
      )}
    </Container>
  );
}

export default ContentPage;
