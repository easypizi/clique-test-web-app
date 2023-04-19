import React from 'react';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ImageIcon from '@mui/icons-material/Image';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const iconByType = {
  presentation: <SlideshowIcon />,
  document: <TextSnippetIcon />,
  audio: <AudiotrackIcon />,
  image: <ImageIcon />,
  video: <LocalMoviesIcon />,
  pdf: <PictureAsPdfIcon />
};

const getIconByType = (type) => iconByType[type] || <AttachFileIcon />;

export default getIconByType;
