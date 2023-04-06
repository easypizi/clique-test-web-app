import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        background: '#fffffe',
        height: '100vh',
        maxHeight: 'calc(100vh - 120px)'
      }}
      className="tabPanel"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, height: '100%', paddingTop: '10px' }}>{children}</Box>
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
