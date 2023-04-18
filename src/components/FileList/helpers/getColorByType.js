import {
  lightBlue,
  purple,
  amber,
  red,
  green,
  grey,
  common
} from '@mui/material/colors';

const mappingColor = {
  presentation: purple,
  pdf: red,
  document: grey,
  audio: lightBlue,
  image: green,
  video: amber
};

const getColorByType = (type) => mappingColor[type] || common;

export default getColorByType;
