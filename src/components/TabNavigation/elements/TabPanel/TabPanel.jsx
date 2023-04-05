import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import './TabPanel.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

export default TabPanel;
