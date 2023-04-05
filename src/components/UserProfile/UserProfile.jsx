/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Stack,
  Checkbox,
  Button,
  Box,
  TextField,
  Typography,
  Chip,
  Container
} from '@mui/material';

import LinkIcon from '@mui/icons-material/Link';

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
      const badgesFromString = inputValue.length ? inputValue.split(',') : [];
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

  const handleUpdateClick = useCallback(() => {
    const updatedUser = {
      name,
      surname,
      description,
      links,
      isVisible,
      badges
    };

    console.log(userId);
    console.log(isAuthorized);
    console.log(updatedUser);

    // TODO: call update User action.
  }, [
    badges,
    description,
    isAuthorized,
    isVisible,
    links,
    name,
    surname,
    userId
  ]);

  return (
    <Container sx={{ p: 0 }}>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Avatar sx={{ width: 100, height: 100 }} src={userAvatar ?? ''} />
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
              sx={{ marginLeft: '10px' }}
              fullWidth
              size="small"
              label="Link"
              value={links[0]}
              onChange={(event) => handleLinkChange(event, 0)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkIcon />
            <TextField
              sx={{ marginLeft: '10px' }}
              fullWidth
              size="small"
              label="Link"
              value={links[1]}
              onChange={(event) => handleLinkChange(event, 1)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkIcon />
            <TextField
              sx={{ marginLeft: '10px' }}
              fullWidth
              size="small"
              label="Link"
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
        disabled={!isAuthorized}
        variant="contained"
        fullWidth
        onClick={handleUpdateClick}
      >
        Update
      </Button>
    </Container>
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
