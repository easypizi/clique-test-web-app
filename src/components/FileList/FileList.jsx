import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress, Box } from '@mui/material';
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';
import Search from '../Search/Search';
import prepareFilesData from './helpers/prepareFilesData';
import FileCard from './elements/FileCard';

function FileList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentSpace, isSpacesLoading } = useSelector((state) => state.spaces);
  const { currentUser } = useSelector((state) => state.user);
  const { user_id: currentUserId } = currentUser ?? { user_id: null };
  const files = currentSpace?.spaceFiles;

  const isLoading = useMemo(() => isSpacesLoading, [isSpacesLoading]);
  const isAdmin = useMemo(
    () => currentUserId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, currentUserId]
  );

  const formattedData = useMemo(
    () => prepareFilesData(files, isAdmin),
    [files, isAdmin]
  );

  const filteredFiles = useMemo(() => {
    if (!formattedData || !formattedData.length) return [];
    return formattedData?.filter(({ name, type }) =>
      [name, type].some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [formattedData, searchTerm]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isLoading ? (
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
          {filteredFiles && filteredFiles.length ? (
            <ScrollableContainer
              style={{
                padding: '10px 2px 0 2px',
                height: 'calc(100% - 40px)',
                gap: '10px',
                marginTop: '5px'
              }}
            >
              {filteredFiles.map((file) => (
                <FileCard key={file.id} {...file} />
              ))}
              {filteredFiles && filteredFiles.length > 3 && (
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
              No files has been found. Please try to choose other space.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default FileList;
