import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import TabPanel from './elements/TabPanel/TabPanel';

import UserList from '../UserList/UserList';
import UserProfile from '../UserProfile/UserProfile';
import ChatList from '../ChatList/ChatList';

function TabNavigation({ user }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userData = {
    userId: user.user_id,
    userName: user.user_name,
    userSurname: user.user_last_name,
    userDescription: user.user_description,
    userVisibility: user.is_visible,
    userAvatar: user.user_image,
    userLinks: user.user_links,
    userBadges: user.user_badges,
    isAuthorized: user.is_authorized
  };

  return (
    <Box>
      <Tabs
        sx={{ width: '100%', padding: '0' }}
        className="tabNavigation"
        value={value}
        onChange={handleChange}
      >
        <Tab label="Chats" />
        <Tab label="Users" />
        <Tab label="Profile" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ChatList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserProfile {...userData} />
      </TabPanel>
    </Box>
  );
}

TabNavigation.propTypes = {
  user: PropTypes.shape({
    user_id: PropTypes.string,
    user_name: PropTypes.string,
    user_last_name: PropTypes.string,
    user_image: PropTypes.string,
    user_description: PropTypes.string,
    user_links: PropTypes.arrayOf(PropTypes.string),
    user_badges: PropTypes.arrayOf(PropTypes.string),
    is_visible: PropTypes.bool,
    is_authorized: PropTypes.bool
  })
};

export default TabNavigation;
