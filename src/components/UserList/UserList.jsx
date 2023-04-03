import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@mui/material';
import Search from '../Search/Search';
import UserCard from './elements/UserCard/UserCard';
import prepareUserData from './helpers/helpers';

import './UserList.css';

function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentSpace, isUserDataLoading } = useSelector(
    (state) => state.spaces
  );

  const isLoading = isUserDataLoading;

  const users = prepareUserData(currentSpace?.spaceUsers || []);

  const filteredUsers = useMemo(() => users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm, users]);

  return (
    <div className="userlist">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Search onSearch={setSearchTerm} />
          {filteredUsers && filteredUsers.length ? (
            filteredUsers.map((user) => <UserCard key={user.id} {...user} />)
          ) : (
            <Typography variant="body1">No users with this name</Typography>
          )}
        </>
      )}
    </div>
  );
}

export default UserList;
