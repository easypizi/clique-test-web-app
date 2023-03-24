import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/actions/userActions';
import UserCard from './UserCard/UserCard';
import prepareUserData from './helpers';

function TgChatUserList() {
  const dispatch = useDispatch();
  const userData = useSelector(({ users }) => ({
    data: users.data,
    isLoading: users.isLoading,
    error: users.error,
  }));
  const { data: users, isLoading, error } = userData;

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch, users.length]);

  const memoizedUsers = useMemo(() => prepareUserData(users), [users]);

  if (isLoading || !memoizedUsers) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="userlist">
      {memoizedUsers.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}

export default TgChatUserList;
