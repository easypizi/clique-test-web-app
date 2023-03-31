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

  return (
    <div>
      <Tabs className="tabNavigation" value={value} onChange={handleChange}>
        <Tab label="User" />
        <Tab label="Profile" />
        <Tab label="Chats" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserProfile />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChatList />
      </TabPanel>
    </div>
  );
}

export default TabNavigation;
