import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, CircularProgress, Box, Typography } from '@mui/material';

import { getUser } from '../../store/actions/userActions';
import { getUserSpaces } from '../../store/actions/spaceActions';

import TabNavigation from '../../components/TabNavigation/TabNavigation';
import Header from '../../components/Header/Header';

function ContentPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector(({ user }) => user);
  const { userSpaces, isUserSpacesLoading } = useSelector(
    ({ spaces }) => spaces
  );

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const userId = useMemo(() => queryParams.get('user_id'), [queryParams]);
  const privateId = useMemo(() => queryParams.get('private_id'), [queryParams]);
  const userSpacesIds = useMemo(
    () => currentUser?.user_spaces || [],
    [currentUser?.user_spaces]
  );

  useEffect(() => {
    const fetchUserData = () => {
      if (!currentUser && !isUserSpacesLoading) {
        dispatch(getUser(userId, privateId));
      }
    };

    fetchUserData();
  }, [currentUser, dispatch, isUserSpacesLoading, privateId, userId]);

  useEffect(() => {
    const fetchUserSpaces = () => {
      if (userSpacesIds?.length > 0 && !userSpaces && !isUserSpacesLoading) {
        dispatch(getUserSpaces(userSpacesIds));
      }
    };

    fetchUserSpaces();
  }, [dispatch, isUserSpacesLoading, userSpaces, userSpacesIds]);

  if (currentUser && !userSpacesIds.length) {
    return (
      <Container
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h2">404</Typography>
        <Typography>Нет пространств сообществ, которые вам доступны</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ height: '100%', padding: '0' }}>
      {!userSpaces || isUserSpacesLoading ? (
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
          <TabNavigation />
        </Box>
      )}
    </Container>
  );
}

export default ContentPage;
