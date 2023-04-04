import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Search from '../Search/Search';
import UserCard from './elements/UserCard/UserCard';
import prepareUserData from './helpers/helpers';

const StyledUserListContainer = styled.div`
  height: 100%;
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

  const users = prepareUserData(currentSpace?.spaceUsers || []);

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
        <CircularProgress />
      ) : (
        <>
          <Search onSearch={setSearchTerm} />
          <StyledUserList>
            {filteredUsers && filteredUsers.length ? (
              filteredUsers.map((user) => <UserCard key={user.id} {...user} />)
            ) : (
              <Typography variant="body1">No users with this name</Typography>
            )}
          </StyledUserList>
        </>
      )}
    </StyledUserListContainer>
  );
}

export default UserList;
