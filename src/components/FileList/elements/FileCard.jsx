import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { saveAs } from 'file-saver';

import { Typography, Avatar, Box, IconButton } from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ImageIcon from '@mui/icons-material/Image';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import getFileType from '../helpers/getFileType';
import getColorByType from '../helpers/getColorByType';

import {
  startProcessingAction,
  successProcessingAction,
  failureProcessingAction
} from '../../../store/actions/filesActions';

const iconByType = {
  presentation: <SlideshowIcon />,
  document: <TextSnippetIcon />,
  audio: <AudiotrackIcon />,
  image: <ImageIcon />,
  video: <LocalMoviesIcon />,
  pdf: <PictureAsPdfIcon />
};

const getAvatarIcon = (type) => iconByType[type] || <AttachFileIcon />;

function FileCard({ canBeDeleted, date, id, name, size, type, url }) {
  const dispatch = useDispatch();

  const timestampToDateTime = useCallback(
    (timestamp, timezone) =>
      moment(timestamp).tz(timezone).format('DD/MM/YYYY'),
    []
  );

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );

  const getAvatar = useCallback(() => {
    const fileType = getFileType(type);
    const color = getColorByType(fileType);

    return (
      <Avatar
        sx={{
          background: color[500],
          width: 50,
          height: 50,
          marginRight: '15px'
        }}
      >
        {getAvatarIcon(fileType)}
      </Avatar>
    );
  }, [type]);

  const handleDeleteFile = useCallback(() => {
    // TODO: update with file delete api method
    // eslint-disable-next-line no-console
    console.log(`delete: ${id}/${name}`);
  }, [id, name]);

  // TODO: update working download solution for mobile method
  const handleDownloadClick = useCallback(() => {
    dispatch(startProcessingAction());
    try {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, name);
          dispatch(successProcessingAction());
        });
    } catch (error) {
      dispatch(failureProcessingAction(error));
    }
  }, [dispatch, name, url]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0px 10px 15px',
        boxShadow: '0.5px 0.5px 1px 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {getAvatar()}
      <Box
        sx={{
          flexGrow: '1',
          height: '100%',
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          maxWidth: '65%'
        }}
      >
        <Typography
          sx={{ width: '100%', wordBreak: 'break-word' }}
          variant="body1"
        >
          {name}
        </Typography>
        <Box
          sx={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '10px'
          }}
        >
          <Typography color="gray" variant="caption">
            {timestampToDateTime(date, timezone)}
          </Typography>
          <Typography color="gray" variant="caption">
            {size}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
          justifyContent: 'center',
          gap: '10px',
          borderLeft: '1px dashed lightgray',
          padding: '0 10px',
          flexShrink: '0'
        }}
      >
        {canBeDeleted && (
          <IconButton size="small" color="primary" onClick={handleDeleteFile}>
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton onClick={handleDownloadClick} size="small" color="primary">
          <DownloadIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

FileCard.propTypes = {
  canBeDeleted: PropTypes.bool,
  date: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string
};

export default FileCard;
