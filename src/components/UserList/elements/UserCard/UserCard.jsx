import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  IconButton,
  Chip,
  Box,
  Divider,
  Stack
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LinkIcon from '@mui/icons-material/Link';
import styled from '@emotion/styled';
import LazyAvatar from '../../../LazyAvatar/LazyAvatar';

const UserDataDescription = styled(Typography)`
  color: #5f6c7b;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.2em !important;
  max-height: calc(1.2em * 3);
`;

const emptyDescription = 'User doesnt add any information about himself in bio';
function UserCard({
  avatarSrc,
  firstName,
  lastName,
  telegramUsername,
  description,
  userBadges,
  userLinks,
  isVisible,
  isSpaceOwner
}) {
  const userCredentials = useMemo(
    () => `${firstName ?? ''} ${lastName ?? ''}`,
    [firstName, lastName]
  );

  const userDescription = useMemo(
    () =>
      description && description.length > 0 ? description : emptyDescription,
    [description]
  );

  const selectedUserBadges = useMemo(
    () => userBadges && userBadges.slice(0, 5),
    [userBadges]
  );

  const getIconForLink = useCallback((item) => {
    switch (true) {
      case item.includes('instagram'):
        return <InstagramIcon />;
      case item.includes('linkedin'):
        return <LinkedInIcon />;
      default:
        return <LinkIcon />;
    }
  }, []);

  const avatarLinkNoCached = useCallback(() => {
    const currentTime = Date.now();
    const isFromTelegram = avatarSrc.charAt(avatarSrc.length - 1) === 'g';
    return `${avatarSrc}${isFromTelegram ? '?' : '&'}time=${currentTime}`;
  }, [avatarSrc]);

  return (
    <Box
      sx={{
        display: isVisible ? 'block' : 'none',
        maxWidth: '100%',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0.5px 0.5px 1px 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', marginRight: '20px' }}>
          <LazyAvatar
            src={avatarLinkNoCached()}
            alt="userPhoto"
            sx={{ width: 80, height: 80 }}
          />
          {isSpaceOwner && (
            <Box sx={{ position: 'absolute', right: '-5px', bottom: '-5px' }}>
              <LocalActivityIcon color="secondary" />
            </Box>
          )}
        </Box>
        <Box sx={{ width: '100%', maxWidth: '75%' }}>
          <Typography variant="h6" sx={{ color: '#094067', maxWidth: '75%' }}>
            {userCredentials}
          </Typography>
          <UserDataDescription variant="body2">
            {userDescription}
          </UserDataDescription>
        </Box>
      </Box>

      <Box sx={{ marginTop: '5px' }}>
        {selectedUserBadges && selectedUserBadges.length > 0 && (
          <>
            <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              {selectedUserBadges.map((item) => (
                <Chip key={item} label={item} size="small" variant="outlined" />
              ))}
            </Box>
          </>
        )}
        <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
        <Stack direction="row" spacing={2}>
          <IconButton
            color="primary"
            href={`https://t.me/${telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
          </IconButton>
          {userLinks &&
            userLinks.map((link) => (
              <IconButton
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getIconForLink(link)}
              </IconButton>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}

UserCard.propTypes = {
  avatarSrc: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  telegramUsername: PropTypes.string,
  description: PropTypes.string,
  isVisible: PropTypes.bool,
  isSpaceOwner: PropTypes.bool,
  userBadges: PropTypes.arrayOf(PropTypes.string),
  userLinks: PropTypes.arrayOf(PropTypes.string)
};

export default UserCard;
