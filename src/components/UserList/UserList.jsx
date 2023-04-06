import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography, Box } from '@mui/material';
import Search from '../Search/Search';
import UserCard from './elements/UserCard/UserCard';
import prepareUserData from './helpers/helpers';
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';

function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentSpace, isSpacesLoading } = useSelector((state) => state.spaces);

  const users = prepareUserData(
    currentSpace?.spaceUsers,
    currentSpace?.spaceOwner
  );

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, users]
  );

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isSpacesLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box sx={{ height: '100%', maxHeight: 'calc(100vh - 120px)' }}>
          <Search onSearch={setSearchTerm} />
          {filteredUsers && filteredUsers.length ? (
            <ScrollableContainer
              style={{
                padding: '10px 2px 0 2px',
                height: 'calc(100% - 60px)',
                gap: '10px',
                marginTop: '20px'
              }}
            >
              {filteredUsers.map((user) => (
                <UserCard key={user.id} {...user} />
              ))}
              {filteredUsers && filteredUsers.length > 2 && (
                <div
                  style={{ width: '100%', height: '300px', flexShrink: 0 }}
                />
              )}
            </ScrollableContainer>
          ) : (
            <Typography
              variant="body1"
              sx={{ marginTop: '20px', textAlign: 'center' }}
            >
              No users has been found
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default UserList;
