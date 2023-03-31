import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

import { getUsers } from '../../store/actions/userActions';
import Search from '../Search/Search';
import UserCard from './elements/UserCard/UserCard';
import prepareUserData from './helpers/helpers';

import './UserList.css';

function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
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
  }, [dispatch, users]);

  const memoizedUsers = useMemo(() => prepareUserData(users), [users]);

  const onSearchHandler = useCallback((searchText) => {
    setSearchTerm(searchText);
  }, []);

  // TODO: extend Search with lastname

  const filteredUsers = useMemo(
    () =>
      memoizedUsers.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, memoizedUsers]
  );

  if (isLoading || !memoizedUsers) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="userlist">
      <Search onSearch={onSearchHandler} />
      {filteredUsers.length ? (
        filteredUsers.map((user) => <UserCard key={user.id} {...user} />)
      ) : (
        <Typography variant="body1">No users with this name</Typography>
      )}
    </div>
  );
}

export default UserList;
