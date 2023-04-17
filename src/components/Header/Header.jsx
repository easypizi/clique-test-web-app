import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import SpaceSelector from '../SpaceSelector/SpaceSelector';
import Status from './Status';

function Header() {
  const [statusIndex, setStatusIndex] = useState(0);

  const {
    isSpacesLoading,
    isSpaceUpdating,
    error: spaceApiError
  } = useSelector((state) => state.spaces);

  const {
    isUserDataLoading,
    isUserDataUpdating,
    isUserDataUpdated,
    error: userApiError
  } = useSelector((state) => state.user);

  const {
    isGroupDataUpdating,
    isGroupDataUpdated,
    error: groupApiError
  } = useSelector((state) => state.groups);

  const statusMessages = useMemo(() => {
    const messages = [];

    if (isSpacesLoading) {
      messages.push('Spaces loading...');
    }

    if (isSpaceUpdating) {
      messages.push('Spaces updating...');
    }

    if (isUserDataLoading) {
      messages.push('User data loading...');
    }

    if (isUserDataUpdating) {
      messages.push('User data updating...');
    }

    if (isUserDataUpdated) {
      messages.push('User data updated!');
    }

    if (isGroupDataUpdating) {
      messages.push('Groups data updating...');
    }

    if (isGroupDataUpdated) {
      messages.push('Groups data updated!');
    }

    if (spaceApiError) {
      messages.push('Spaces api fetch error.');
    }

    if (groupApiError) {
      messages.push('Groups api fetch error.');
    }

    if (userApiError) {
      messages.push('User api fetch error.');
    }

    return messages;
  }, [
    groupApiError,
    isGroupDataUpdated,
    isGroupDataUpdating,
    isSpaceUpdating,
    isSpacesLoading,
    isUserDataLoading,
    isUserDataUpdated,
    isUserDataUpdating,
    spaceApiError,
    userApiError
  ]);

  useEffect(() => {
    if (statusMessages.length > 0) {
      const timeout = setTimeout(() => {
        setStatusIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex < statusMessages.length ? nextIndex : 0;
        });
      }, 2000);

      return () => clearTimeout(timeout);
    }

    return () => {};
  }, [statusIndex, statusMessages.length]);

  return (
    <Box
      sx={{
        width: '100%',
        padding: '5px 0 10px 0',
        height: '50px',
        borderBottom: '0.5px solid lightgrey'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        {statusMessages.length > 0 && (
          <Status status={statusMessages[statusIndex]} />
        )}
        <SpaceSelector />
      </Box>
    </Box>
  );
}

export default Header;
