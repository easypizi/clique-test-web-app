import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';
import Search from '../Search/Search';
import UserCard from './elements/UserCard/UserCard';
import prepareUserData from './helpers/helpers';

const StyledUserListContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;

const StyledUserList = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2px;
  margin-top: 20px;
`;

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
    <StyledUserListContainer>
      {isSpacesLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box sx={{ maxHeight: '100vh' }}>
          <Search onSearch={setSearchTerm} />
          <StyledUserList>
            {filteredUsers && filteredUsers.length ? (
              filteredUsers.map((user) => <UserCard key={user.id} {...user} />)
            ) : (
              <Typography variant="body1">No users with this name</Typography>
            )}
            <div style={{ width: '100%', height: '300px', flexShrink: 0 }} />
          </StyledUserList>
        </Box>
      )}
    </StyledUserListContainer>
  );
}

export default UserList;
