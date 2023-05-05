import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Typography,
  IconButton,
  Chip,
  Box,
  Divider,
  Stack
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LinkIcon from '@mui/icons-material/Link';
import styled from '@emotion/styled';
import LazyAvatar from '../../LazyAvatar/LazyAvatar';
import { updateSpaceUserAction } from '../../../store/actions/userActions';

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
  id,
  avatarSrc,
  firstName,
  lastName,
  telegramUsername,
  description,
  userBadges,
  userLinks,
  isSpaceOwner,
  canBeDeleted,
  userHiddenSpaces,
  isHiddenByAdmin,
  spaceId
}) {
  const dispatch = useDispatch();

  const [hidden, setHidden] = useState(false);

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

  const handleHideUser = useCallback(() => {
    if (spaceId) {
      const updatedArray = new Set(userHiddenSpaces);
      updatedArray.add(spaceId);

      const updateData = {
        user_id: id,
        user_hidden_spaces: [...updatedArray],
        user_last_chosen_space: ''
      };

      dispatch(updateSpaceUserAction(updateData, spaceId));
      setHidden(true);
    }
  }, [dispatch, id, spaceId, userHiddenSpaces]);

  const handleUnhideUser = useCallback(() => {
    if (spaceId) {
      const updatedHiddenSpace = userHiddenSpaces.filter(
        (space) => space !== spaceId
      );

      const updateData = {
        user_id: id,
        user_hidden_spaces: updatedHiddenSpace
      };

      dispatch(updateSpaceUserAction(updateData, spaceId));
      setHidden(true);
    }
  }, [dispatch, id, spaceId, userHiddenSpaces]);

  return (
    <Box
      sx={{
        display: !hidden ? 'block' : 'none',
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0.5px 0.5px 1px 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', marginRight: '20px' }}>
          <LazyAvatar
            src={avatarSrc}
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
        <Stack
          sx={{ width: '100%', position: 'relative' }}
          direction="row"
          spacing={2}
        >
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
          {canBeDeleted && !isSpaceOwner && (
            <IconButton
              sx={{ position: 'absolute', right: 0 }}
              color="primary"
              onClick={isHiddenByAdmin ? handleUnhideUser : handleHideUser}
            >
              {isHiddenByAdmin ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

UserCard.propTypes = {
  id: PropTypes.string,
  avatarSrc: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  telegramUsername: PropTypes.string,
  description: PropTypes.string,
  spaceId: PropTypes.string,
  isHiddenByAdmin: PropTypes.bool,
  isSpaceOwner: PropTypes.bool,
  canBeDeleted: PropTypes.bool,
  userHiddenSpaces: PropTypes.arrayOf(PropTypes.string),
  userBadges: PropTypes.arrayOf(PropTypes.string),
  userLinks: PropTypes.arrayOf(PropTypes.string)
};

export default UserCard;
