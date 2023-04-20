import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import SpaceSelector from './elements/SpaceSelector';
import Status from './elements/Status';

function Header() {
  const [statusIndex, setStatusIndex] = useState(0);

  const {
    isSpaceLoading,
    isUserSpacesLoading,
    isSpaceUpdating,
    error: spaceApiError
  } = useSelector(({ spaces }) => spaces);

  const { isProcessingFile, isUploadingFile } = useSelector(
    ({ files }) => files
  );

  const {
    isUserDataLoading,
    isUserDataUpdating,
    error: userApiError
  } = useSelector(({ user }) => user);

  const { isGroupDataUpdating, error: groupApiError } = useSelector(
    ({ groups }) => groups
  );

  const statusMessages = useMemo(() => {
    const messages = [];

    if (isProcessingFile) {
      messages.push('File processing...');
    }

    if (isUploadingFile) {
      messages.push('File uploading...');
    }

    if (isSpaceUpdating) {
      messages.push('Spaces updating...');
    }

    if (isUserDataUpdating) {
      messages.push('User data updating...');
    }

    if (isGroupDataUpdating) {
      messages.push('Groups data updating...');
    }

    if (isSpaceLoading) {
      messages.push('Space loading...');
    }

    if (isUserSpacesLoading) {
      messages.push('User spaces loading...');
    }

    if (isUserDataLoading) {
      messages.push('User data loading...');
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
    isProcessingFile,
    isUploadingFile,
    isSpaceUpdating,
    isUserDataUpdating,
    isGroupDataUpdating,
    isSpaceLoading,
    isUserSpacesLoading,
    isUserDataLoading,
    spaceApiError,
    groupApiError,
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
