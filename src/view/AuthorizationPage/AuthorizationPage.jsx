import React, { useCallback, useEffect, useMemo } from 'react';
import store from 'store2';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import { getUser } from '../../store/actions/userActions';
import { getUserSpaces, getSpace } from '../../store/actions/spaceActions';

import './AuthorizationPage.css';
import LinkButton from '../../components/LinkButton/LinkButton';

function AuthorizationPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storedUserId = store.session.get('userId');
  const storedPrivateId = store.session.get('privateId');
  const userId = queryParams.get('user_id') ?? storedUserId;
  const privateId = queryParams.get('private_id') ?? storedPrivateId;
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

  const renderLoginButtons = useCallback(() => {
    if (!isLoading && !memoizedSpaces) {
      return (
        <Typography variant="body2">
          You dont have any have any space to join
        </Typography>
      );
    }
    const buttons = userSpaces.map((space) => {
      const clickHandler = (id) => {
        dispatch(getSpace(id));
      };
      return (
        <LinkButton
          key={space.space_id}
          to="/space"
          onClick={() => clickHandler(space.space_id)}
        >
          {space.space_name}
        </LinkButton>
      );
    });
    return (
      <div className="linkBlock">
        <div className="buttonHolder">{buttons}</div>
      </div>
    );
  }, [dispatch, isLoading, memoizedSpaces, userSpaces]);

  return (
    <div className="container">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h2">Welcome!</Typography>
          <Typography variant="h5">
            Please, choose any community below to join:
          </Typography>
          {renderLoginButtons()}
        </>
      )}
    </div>
  );
}

export default AuthorizationPage;
