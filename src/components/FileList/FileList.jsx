import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  useLayoutEffect
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Typography,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  Slide,
  IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';
import Search from '../Search/Search';
import prepareFilesData from './helpers/prepareFilesData';
import FileCard from './elements/FileCard';
import FileFilters from './elements/FileFilters';

import { uploadFileAction } from '../../store/actions/filesActions';
import { getSpace } from '../../store/actions/spaceActions';
import getFileType from './helpers/getFileType';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function FileList() {
  const dispatch = useDispatch();
  const filtersRef = useRef(null);
  const [alertVisible, setAlertVisibility] = useState(false);
  const [offsetHeight, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { isFileSent } = useSelector((state) => state.files);
  const { currentSpace, isSpaceLoading } = useSelector((state) => state.spaces);
  const { activeFileFilters } = useSelector((state) => state.files);
  const { currentUser } = useSelector((state) => state.user);
  const { user_id: currentUserId } = currentUser ?? { user_id: null };

  const files = useMemo(
    () => currentSpace?.spaceFiles,
    [currentSpace?.spaceFiles]
  );
  const spaceId = useMemo(() => currentSpace?.spaceId, [currentSpace?.spaceId]);
  const isLoading = useMemo(() => isSpaceLoading, [isSpaceLoading]);
  const isAdmin = useMemo(
    () => currentUserId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, currentUserId]
  );

  const formattedData = useMemo(
    () => prepareFilesData(files, isAdmin, currentUserId),
    [currentUserId, files, isAdmin]
  );

  const filteredFiles = useMemo(() => {
    if (!formattedData || !formattedData.length) return [];

    const filteredDataByFileTypes = formattedData.filter((item) =>
      activeFileFilters.includes(getFileType(item.type))
    );

    const data =
      activeFileFilters && activeFileFilters.length
        ? filteredDataByFileTypes
        : formattedData;

    return data.filter(({ name, type }) =>
      [name, type].some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [formattedData, searchTerm, activeFileFilters]);

  const handleFileUpload = useCallback(
    (event) => {
      if (event?.target?.files && event?.target?.files[0]) {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('space_id', spaceId);
        formData.append('file', file);

        dispatch(uploadFileAction(formData)).then(() => {
          dispatch(getSpace(spaceId));
        });
      }
    },
    [dispatch, spaceId]
  );

  const handleCloseAlert = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertVisibility(false);
  }, []);

  useEffect(() => {
    if (isFileSent) {
      setAlertVisibility(true);
    }
  }, [isFileSent]);

  useLayoutEffect(() => {
    if (filtersRef.current) {
      const height = filtersRef.current.offsetHeight;
      setOffset(height);
    }
  }, [currentSpace]);

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
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              paddingRight: isAdmin ? '10px' : 0
            }}
          >
            <Search onSearch={setSearchTerm} />
            {isAdmin && (
              <IconButton
                color="primary"
                aria-label="upload file"
                component="label"
                sx={{
                  background: 'lightBlue'
                }}
              >
                <input
                  onChange={handleFileUpload}
                  hidden
                  accept="*/*"
                  multiple
                  type="file"
                />
                <AddCircleOutlineIcon color="action" />
              </IconButton>
            )}
          </Box>
          <div ref={filtersRef}>
            <FileFilters />
          </div>
          {filteredFiles && filteredFiles.length ? (
            <ScrollableContainer
              style={{
                padding: '10px 2px 0 2px',
                height: `calc(100% - ${offsetHeight + 40}px)`,
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
              <Snackbar
                open={alertVisible}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert
                  onClose={handleCloseAlert}
                  severity="success"
                  elevation={6}
                  variant="filled"
                >
                  File was sent to you. Check dialog with bot.
                </Alert>
              </Snackbar>
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
