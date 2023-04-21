import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TagIcon from '@mui/icons-material/Tag';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HandshakeIcon from '@mui/icons-material/Handshake';

import TabPanel from './elements/TabPanel';
import UserList from '../UserList/UserList';
import UserProfile from '../UserProfile/UserProfile';
import ChatList from '../ChatList/ChatList';
import FileList from '../FileList/FileList';
import MessageBoard from '../MessageBoard/MessageBoard';
import TinderBoard from '../Tinder/TinderBoard';

// TODO: Calendar
// import EventIcon from '@mui/icons-material/Event';

function TabNavigation() {
  const { isSpaceLoading } = useSelector(({ spaces }) => spaces);
  const { isGroupDataUpdating } = useSelector(({ groups }) => groups);

  const isLoading = useMemo(
    () => isSpaceLoading || isGroupDataUpdating,
    [isGroupDataUpdating, isSpaceLoading]
  );

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // TODO: Check how many tabs should be viewed and update Tabs variant props from fullWidth to scrollable

  return (
    <Box
      sx={{
        height: 'calc(100% - 50px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Tabs
        variant="fullWidth"
        sx={{ width: '100%', padding: '0' }}
        value={value}
        onChange={handleChange}
      >
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isLoading}
          icon={<QuestionAnswerIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isLoading}
          icon={<GroupIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isLoading}
          icon={<AccountCircleIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isLoading}
          icon={<HandshakeIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isLoading}
          icon={<TagIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isLoading}
          icon={<DescriptionIcon />}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ChatList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserProfile />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TinderBoard />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MessageBoard />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <FileList />
      </TabPanel>
    </Box>
  );
}

export default TabNavigation;
