import React from 'react';
import { Box } from '@mui/material';
import SpaceSelector from '../SpaceSelector/SpaceSelector';

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
        <SpaceSelector />
      </Box>
    </Box>
  );
}

export default Header;
