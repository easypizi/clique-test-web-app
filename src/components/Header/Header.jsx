import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Fade, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import store from 'store2';

import LinkButton from '../LinkButton/LinkButton';

function Header() {
  const { isUserDataLoading } = useSelector((state) => state.currentUser);

  const { currentSpace, isSpacesLoading } = useSelector((state) => state.spaces);

  const isLoading = useMemo(
    () => isUserDataLoading || isSpacesLoading,
    [isUserDataLoading, isSpacesLoading]
  );

  const storedUserId = store.session.get('userId');
  const storedPrivateId = store.session.get('privateId');

  const backToMainLink = useMemo(
    () =>
      storedUserId && storedPrivateId
        ? `/?user_id=${storedUserId}&private_id=${storedPrivateId}`
        : '/',
    [storedPrivateId, storedUserId]
  );

  return (
    <Box
      sx={{
        width: '100%',
        padding: '5px 0 10px 0',
        height: '50px',
        borderBottom: '0.5px solid lightgrey'
      }}
    >
      <Fade
        in={!isLoading}
        style={{ transitionDelay: isLoading ? '0ms' : '300ms' }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <LinkButton variant="outlined" to={backToMainLink}>
            <ArrowBackIcon />
          </LinkButton>
          <Typography variant="body1">
            {currentSpace?.spaceName?.toUpperCase()}
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}

export default Header;
