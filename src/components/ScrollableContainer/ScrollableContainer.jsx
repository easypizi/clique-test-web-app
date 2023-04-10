import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function ScrollableContainer({ children, style }) {
  const preventPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

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
      onTouchStart={preventPropagation}
      onTouchMove={preventPropagation}
      onTouchEnd={preventPropagation}
      onTouchCancel={preventPropagation}
      onWheel={preventPropagation}
      onMouseWheel={preventPropagation}
      onDOMMouseScroll={preventPropagation}
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
