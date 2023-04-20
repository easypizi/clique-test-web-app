import React from 'react';

import { Box } from '@mui/material';
import SpaceSelector from './elements/SpaceSelector';
import Status from './elements/Status';

function Header() {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '5px 0 10px 0',
        height: '50px',
        borderBottom: '0.5px solid lightgrey'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <Status />
        <SpaceSelector />
      </Box>
    </Box>
  );
}

export default Header;
