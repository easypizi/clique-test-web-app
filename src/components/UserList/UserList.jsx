import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography, Box, Checkbox } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Search from '../Search/Search';
import UserCard from './elements/UserCard';
import prepareUserData from './helpers/helpers';
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';

function UserList() {
  const { currentSpace, isSpacesLoading } = useSelector((state) => state.spaces);
  const { currentUser } = useSelector((state) => state.user);
  const [isVisibleUsers, setUsersVisibility] = useState(true);
  const { user_id: currentUserId } = currentUser ?? {};

  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = useMemo(
    () => currentUserId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, currentUserId]
  );

  const hiddenUsers = useMemo(() => {
    if (!currentSpace || !currentSpace.spaceUsers) {
      return [];
    }
    return currentSpace.spaceUsers.filter((user) =>
      user.userHiddenSpaces.some((space) => space === currentSpace?.spaceId)
    );
  }, [currentSpace]);

  const visibleUsers = useMemo(() => {
    if (!currentSpace || !currentSpace?.spaceUsers?.length) {
      return [];
    }

    return currentSpace.spaceUsers.filter((user) => {
      if (!user.userHiddenSpaces) {
        return true;
      }

      return user.userHiddenSpaces.every(
        (space) => space !== currentSpace.spaceId
      );
    });
  }, [currentSpace]);

  const users = useMemo(
    () =>
      prepareUserData(
        isVisibleUsers ? visibleUsers : hiddenUsers,
        currentSpace?.spaceOwner,
        isAdmin,
        currentSpace?.spaceId
      ),
    [currentSpace, hiddenUsers, isAdmin, isVisibleUsers, visibleUsers]
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

  const handleToggleVisibility = useCallback(() => {
    setUsersVisibility((value) => !value);
  }, []);

  useEffect(() => {
    setUsersVisibility(true);
  }, [isSpacesLoading]);

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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Search onSearch={setSearchTerm} />
            {isAdmin && (
              <Checkbox
                onChange={handleToggleVisibility}
                icon={<VisibilityIcon />}
                checkedIcon={<VisibilityOffIcon />}
              />
            )}
          </Box>
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
              No users has been found
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default UserList;
