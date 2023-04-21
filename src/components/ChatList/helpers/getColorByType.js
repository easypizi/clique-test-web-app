import { green, blue, orange } from '@mui/material/colors';

const getColorByType = (type) => {
  const mapping = {
    group: blue,
    supergroup: green,
    channel: orange
  };

  return mapping[type][600];
};

export default getColorByType;
