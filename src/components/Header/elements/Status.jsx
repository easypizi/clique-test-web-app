import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

function Status() {
  const [status, setStatus] = useState('');

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
      // eslint-disable-next-line no-restricted-syntax
      for (const message of statusMessages) {
        if (message !== '') {
          setStatus(message);
          break;
        }
      }

      const timeout = setTimeout(() => {
        setStatus('');
      }, 2000);

      return () => clearTimeout(timeout);
    }

    setStatus('');

    return () => {};
  }, [statusMessages]);

  return (
    <Typography sx={{ marginRight: 'auto' }} variant="body2">
      {status}
    </Typography>
  );
}

export default Status;
