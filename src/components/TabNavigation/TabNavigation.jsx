import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './elements/TabPanel/TabPanel';

import './TabNavigation.css';
import UserList from '../UserList/UserList';
import UserProfile from '../UserProfile/UserProfile';
import ChatList from '../ChatList/ChatList';

function TabNavigation() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mockedUser = {
    userName: 'Igor',
    userSurName: 'Nikolaev',
    userDescription: 'Good singer, good person',
    userLinks: ['vk.com', 'google.com', 'tolstov.me'],
    userVisibility: true,
    userAvatar:
      'https://c-cl.cdn.smule.com/rs-s49/arr/30/cb/58fb7ca6-43fc-450b-95fe-b9138bd01ded.jpg',
    userBadges: ['songs', 'poems', 'pure love']
  };

  return (
    <div>
      <Tabs className="tabNavigation" value={value} onChange={handleChange}>
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
        <UserProfile {...mockedUser} />
      </TabPanel>
    </div>
  );
}

export default TabNavigation;
