import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import store from 'store2';

import LinkButton from '../LinkButton/LinkButton';

function Header() {
  const { isUserDataLoading } = useSelector((state) => state.currentUser);

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
    !isUserDataLoading && (
      <Box sx={{ width: '100%', margin: '5px 0 10px 0' }}>
        <LinkButton variant="outlined" to={backToMainLink}>
          <ArrowBackIcon />
        </LinkButton>
        <Divider sx={{ marginTop: '5px' }} />
      </Box>
    )
  );
}

export default Header;
