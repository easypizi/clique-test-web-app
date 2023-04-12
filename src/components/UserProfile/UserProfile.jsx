import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Checkbox,
  Button,
  Box,
  TextField,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  getUser,
  updateUserData,
  resetUserDataUpdate,
  uploadNewUserPhotoAction
} from '../../store/actions/userActions';
import { getSpace } from '../../store/actions/spaceActions';
import LazyAvatar from '../LazyAvatar/LazyAvatar';
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';

function UserProfile({
  userId,
  isAuthorized,
  userName,
  userSurname,
  userDescription,
  userLinks,
  userVisibility,
  userAvatar,
  userBadges = []
}) {
  const dispatch = useDispatch();
  const { isUserDataUpdating, isUserDataUpdated, error, currentUser } =
    useSelector((state) => state.currentUser);
  const { currentSpace } = useSelector((state) => state.spaces);

  const [updateButtonColor, setUpdateButtonColor] = useState('primary');
  const [updateButtonText, setUpdateButtonText] = useState('Update');
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(
    !isAuthorized
  );
  const [name, setName] = useState(userName ?? '');
  const [surname, setSurname] = useState(userSurname ?? '');
  const [description, setDescription] = useState(userDescription ?? '');
  const [links, setLinks] = useState(userLinks ?? []);
  const [isVisible, setIsVisible] = useState(userVisibility ?? true);
  const [badges, setNewBadges] = useState(userBadges ?? []);

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleSurnameChange = useCallback((event) => {
    setSurname(event.target.value);
  }, []);

  const handleDescriptionChange = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const handleLinkChange = useCallback(
    (event, index) => {
      const newLinks = [...links];
      if (event.target.value.length) {
        newLinks[index] = event.target.value;
      } else {
        newLinks.splice(index, 1);
      }
      setLinks(newLinks);
    },
    [links]
  );

  const handleIsVisibleChange = useCallback((event) => {
    setIsVisible(event.target.checked);
  }, []);

  const handleBadgeChange = useCallback(
    (event) => {
      const inputValue = event.target.value;
      const badgesFromString = inputValue.length
        ? inputValue.replace(' ', '').split(',')
        : [];

      const newValues = [...new Set([...badges, ...badgesFromString])];

      setNewBadges(newValues);
    },
    [badges]
  );

  const handleChipDelete = useCallback(
    (badgeName) => {
      const newBadges = badges.filter((item) => item !== badgeName);
      setNewBadges(newBadges);
    },
    [badges]
  );

  const handlePhotoUpload = useCallback(
    (event) => {
      if (event?.target?.files && event?.target?.files[0]) {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('picture', file);

        dispatch(uploadNewUserPhotoAction(formData));
        setUpdateButtonText('Updating...');
      }
    },
    [dispatch, userId]
  );

  const handleUpdateClick = useCallback(() => {
    if (updateButtonDisabled || !isAuthorized) {
      return;
    }

    const updateData = {
      user_id: userId,
      user_name: name,
      user_last_name: surname,
      user_description: description,
      is_visible: isVisible,
      user_links: links,
      user_badges: badges
    };

    dispatch(updateUserData(updateData));
    setUpdateButtonDisabled(true);
    setUpdateButtonText('Updating...');
  }, [
    badges,
    description,
    dispatch,
    isVisible,
    links,
    name,
    surname,
    updateButtonDisabled,
    userId,
    isAuthorized
  ]);

  useEffect(() => {
    if (isUserDataUpdated) {
      setUpdateButtonColor('success');
      setUpdateButtonText('User data Updated');
      dispatch(resetUserDataUpdate());
      dispatch(getSpace(currentSpace.spaceId));
      dispatch(getUser(userId, currentUser.user_bot_chat_id));
    } else if (error) {
      setUpdateButtonColor('error');
      setUpdateButtonText('Update Failure!');
      dispatch(resetUserDataUpdate());
    }

    setTimeout(() => {
      setUpdateButtonDisabled(false);
      setUpdateButtonColor('primary');
      setUpdateButtonText('Update');
    }, 3000);
  }, [
    error,
    isUserDataUpdated,
    isAuthorized,
    dispatch,
    currentSpace,
    userId,
    currentUser
  ]);

  return (
    <ScrollableContainer
      style={{
        padding: '20px 0 20px 0',
        height: '100%',
        boxShadow: 'none'
      }}
    >
      <Stack direction="row" sx={{ width: '100%', position: 'relative' }}>
        <LazyAvatar sx={{ width: 100, height: 100 }} src={userAvatar} />
        {isAuthorized && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              background: 'lightBlue',
              position: 'absolute',
              bottom: '0',
              left: '60px'
            }}
          >
            <input
              onChange={handlePhotoUpload}
              hidden
              accept="image/*"
              multiple
              type="file"
            />
            <PhotoCamera />
          </IconButton>
        )}
        <Stack sx={{ marginLeft: '10px', width: '100%' }} spacing={2}>
          <TextField
            fullWidth
            size="small"
            id="userNameInputController"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            fullWidth
            size="small"
            id="userSurnameInputController"
            label="Surname"
            value={surname}
            onChange={handleSurnameChange}
          />
        </Stack>
      </Stack>
      <Box sx={{ marginTop: '10px', width: '100%' }}>
        <TextField
          fullWidth
          size="small"
          id="userDescriptionController"
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={handleDescriptionChange}
        />
      </Box>
      <Box sx={{ width: '100%', marginTop: '10px' }}>
        <Typography variant="body1">Additional links: </Typography>
        <Stack spacing={2} sx={{ width: '100%', marginTop: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkIcon />
            <TextField
              id="userLink1"
              sx={{ marginLeft: '10px' }}
              fullWidth
              size="small"
              label="Link"
              placeholder="https://..."
              value={links[0]}
              onChange={(event) => handleLinkChange(event, 0)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkIcon />
            <TextField
              id="userLink2"
              sx={{ marginLeft: '10px' }}
              fullWidth
              size="small"
              label="Link"
              placeholder="https://..."
              value={links[1]}
              onChange={(event) => handleLinkChange(event, 1)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkIcon />
            <TextField
              id="userLink3"
              sx={{ marginLeft: '10px' }}
              fullWidth
              size="small"
              label="Link"
              placeholder="https://..."
              value={links[2]}
              onChange={(event) => handleLinkChange(event, 2)}
            />
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <Checkbox
          sx={{ padding: 0 }}
          checked={isVisible}
          onChange={handleIsVisibleChange}
        />
        <Typography variant="body1">Show me in community space</Typography>
      </Box>

      <Box sx={{ width: '100%', margin: '10px 0 20px 0' }}>
        <Typography variant="body1">Skills: </Typography>
        <TextField
          sx={{ marginTop: '10px' }}
          fullWidth
          size="small"
          placeholder="Skill 1, Skill 2, Skill 3 ..."
          onBlur={(event) => handleBadgeChange(event)}
        />
        <Box
          sx={{
            marginTop: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px'
          }}
        >
          {badges.map((badge) => (
            <Chip
              key={badge}
              variant="outlined"
              size="small"
              label={badge}
              onDelete={() => handleChipDelete(badge)}
            />
          ))}
        </Box>
      </Box>
      <Button
        sx={{ marginTop: 'auto' }}
        fullWidth
        variant="contained"
        color={updateButtonColor}
        disabled={!isAuthorized || isUserDataUpdating}
        onClick={handleUpdateClick}
      >
        {updateButtonText}
      </Button>
    </ScrollableContainer>
  );
}

UserProfile.propTypes = {
  userId: PropTypes.string,
  isAuthorized: PropTypes.bool,
  userName: PropTypes.string,
  userSurname: PropTypes.string,
  userDescription: PropTypes.string,
  userLinks: PropTypes.arrayOf(PropTypes.string),
  userVisibility: PropTypes.bool,
  userAvatar: PropTypes.string,
  userBadges: PropTypes.arrayOf(PropTypes.string)
};

export default UserProfile;
