import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        maxHeight: 'calc(100% - 50px)',
        background: '#fffffe',
        flexGrow: 1
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ height: '100%', padding: '10px 0 0 0' }}>{children}</Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

export default TabPanel;
