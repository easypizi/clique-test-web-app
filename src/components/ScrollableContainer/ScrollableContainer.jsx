import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function ScrollableContainer({ children, style }) {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'overlay',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow:
          'inset 0 -10px 10px -10px rgba(0, 0, 0, 0.3),  inset 0 10px 10px -10px rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        ...style
      }}
    >
      {children}
    </Box>
  );
}

ScrollableContainer.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object
};

export default ScrollableContainer;
