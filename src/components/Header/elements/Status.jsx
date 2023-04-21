import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

function Status() {
  const { isSpaceLoading, isUserSpacesLoading, isSpaceUpdating } = useSelector(
    ({ spaces }) => spaces
  );

  const { isProcessingFile, isUploadingFile } = useSelector(
    ({ files }) => files
  );

  const { isUserDataLoading, isUserDataUpdating } = useSelector(
    ({ user }) => user
  );

  const { isGroupDataUpdating } = useSelector(({ groups }) => groups);

  const isLoading = useMemo(
    () =>
      isSpaceLoading ||
      isUserSpacesLoading ||
      isSpaceUpdating ||
      isProcessingFile ||
      isUploadingFile ||
      isUserDataLoading ||
      isUserDataUpdating ||
      isGroupDataUpdating,
    [
      isGroupDataUpdating,
      isProcessingFile,
      isSpaceLoading,
      isSpaceUpdating,
      isUploadingFile,
      isUserDataLoading,
      isUserDataUpdating,
      isUserSpacesLoading
    ]
  );

  return (
    isLoading && (
      <CircularProgress color="info" size="20px" sx={{ marginRight: 'auto' }} />
    )
  );
}

export default Status;
