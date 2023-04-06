import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Typography,
  IconButton,
  Chip,
  Box,
  Divider
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LinkIcon from '@mui/icons-material/Link';
import styled from '@emotion/styled';

const CardHolder = styled(Box)`
  max-width: 100%;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
`;

const CardBody = styled.div`
  display: flex;
  overflow: hidden;
`;

const UserProfilePhoto = styled.div`
  margin-right: 20px;
  position: relative;
`;

const UserPhoto = styled(Avatar)`
  width: 80px !important;
  height: 80px !important;
`;

const UserInfo = styled.div`
  width: 75%;
`;

const UserDataTitle = styled(Typography)`
  color: #094067;
  width: 75%;
`;

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

const CardFooter = styled.div`
  margin-top: 5px;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 10px;
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

  return (
    <CardHolder sx={{ display: isVisible ? 'block' : 'none' }}>
      <CardBody>
        <UserProfilePhoto>
          <UserPhoto src={avatarSrc} />
          {isSpaceOwner && (
            <Box sx={{ position: 'absolute', right: '-5px', bottom: '-5px' }}>
              <LocalActivityIcon color="secondary" />
            </Box>
          )}
        </UserProfilePhoto>
        <UserInfo>
          <UserDataTitle variant="h6">{userCredentials}</UserDataTitle>
          <UserDataDescription variant="body2">
            {userDescription}
          </UserDataDescription>
        </UserInfo>
      </CardBody>

      <CardFooter>
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
        <LinkGroup>
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
              <IconButton href={link} target="_blank" rel="noopener noreferrer">
                {getIconForLink(link)}
              </IconButton>
            ))}
        </LinkGroup>
      </CardFooter>
    </CardHolder>
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
