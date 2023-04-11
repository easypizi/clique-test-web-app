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

  const filteredUsers = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    if (!users) return [];

    return users.filter((user) => {
      const { firstName, lastName, description, userBadges } = user;
      const normalizedFirstName = firstName.toLowerCase();
      const normalizedLastName = lastName.toLowerCase();
      const normalizedDescription = description.toLowerCase();

      const nameMatch =
        normalizedFirstName.includes(normalizedSearchTerm) ||
        normalizedLastName.includes(normalizedSearchTerm);

      const descriptionMatch =
        normalizedDescription.includes(normalizedSearchTerm);

      const badgesMatch =
        userBadges &&
        userBadges.some((item) =>
          item.toLowerCase().includes(normalizedSearchTerm)
        );

      return nameMatch || descriptionMatch || badgesMatch;
    });
  }, [searchTerm, users]);

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
        <Box sx={{ height: '100%', paddingBottom: '10px' }}>
          <Search onSearch={setSearchTerm} />

          {filteredUsers && filteredUsers.length ? (
            <ScrollableContainer
              style={{
                padding: '20px 2px 0 2px',
                height: 'calc(100% - 40px)',
                gap: '10px',
                marginTop: '5px'
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
              No users has been found. Please try to choose other space
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default UserList;
