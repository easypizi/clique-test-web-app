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
  const { currentUser, isUserDataLoading, isAuthorized } = useSelector(
    ({ user }) => user
  );
  const { userSpaces, isUserSpacesLoading } = useSelector(
    ({ spaces }) => spaces
  );

  const storedUserId = useMemo(() => {
    store.session.get('userId');
  }, []);
  const storedPrivateId = useMemo(() => {
    store.session.get('privateId');
  }, []);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const userId = useMemo(
    () => queryParams.get('user_id') ?? storedUserId,
    [queryParams, storedUserId]
  );
  const privateId = useMemo(
    () => queryParams.get('private_id') ?? storedPrivateId,
    [queryParams, storedPrivateId]
  );
  const userSpacesIds = useMemo(
    () => currentUser?.user_spaces || [],
    [currentUser?.user_spaces]
  );
  const isLoading = useMemo(
    () => isUserDataLoading || isUserSpacesLoading,
    [isUserSpacesLoading, isUserDataLoading]
  );

  useEffect(() => {
    const fetchUserData = () => {
      if (!currentUser && !isLoading) {
        dispatch(getUser(userId, privateId));
        if (!storedUserId && userId) {
          store.session.set('userId', userId);
        }
        if (!storedPrivateId && privateId) {
          store.session.set('privateId', privateId);
        }
      }
    };

    fetchUserData();
  }, [
    currentUser,
    dispatch,
    isLoading,
    privateId,
    storedPrivateId,
    storedUserId,
    userId
  ]);

  useEffect(() => {
    const fetchUserSpaces = () => {
      if (userSpacesIds?.length > 0 && !userSpaces && !isLoading) {
        dispatch(getUserSpaces(userSpacesIds));
      }
    };

    fetchUserSpaces();
  }, [dispatch, isLoading, userSpaces, userSpacesIds]);

  return (
    <Container sx={{ height: '100%' }}>
      {isLoading || !userSpaces ? (
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
