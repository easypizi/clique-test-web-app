import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkButton from '../LinkButton/LinkButton';

function Header() {
  const { currentUser, isUserDataLoading } = useSelector(
    (state) => state.currentUser
  );

  const backToMainLink = useMemo(
    () =>
      currentUser
        ? `/?user_id=${currentUser.user_id}&private_id=${currentUser.user_bot_chat_id}`
        : '/',
    [currentUser]
  );

  return (
    <div>
      {!isUserDataLoading && (
        <Box sx={{ width: '100%', margin: '5px 0 10px 0' }}>
          <LinkButton variant="outlined" to={backToMainLink}>
            <ArrowBackIcon />
          </LinkButton>
          <Divider sx={{ marginTop: '5px' }} />
        </Box>
      )}
    </div>
  );
}

export default Header;
