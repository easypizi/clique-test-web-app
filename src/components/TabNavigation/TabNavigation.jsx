import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import TagIcon from '@mui/icons-material/Tag';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TabPanel from './elements/TabPanel';
import UserList from '../UserList/UserList';
import UserProfile from '../UserProfile/UserProfile';
import ChatList from '../ChatList/ChatList';
import FileList from '../FileList/FileList';
import MessageBoard from '../MessageBoard/MessageBoard';

// TODO: TINDER
// import ControlPointIcon from '@mui/icons-material/ControlPoint';
// TODO: Calendar
// import EventIcon from '@mui/icons-material/Event';

function TabNavigation() {
  const { isSpaceLoading } = useSelector(({ spaces }) => spaces);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: 'calc(100% - 50px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Tabs
        sx={{ width: '100%', padding: '0' }}
        value={value}
        onChange={handleChange}
      >
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isSpaceLoading}
          icon={<QuestionAnswerIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isSpaceLoading}
          icon={<GroupIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isSpaceLoading}
          icon={<AccountCircleIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isSpaceLoading}
          icon={<TagIcon />}
        />
        <Tab
          sx={{ minWidth: 'unset' }}
          disabled={isSpaceLoading}
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
        <MessageBoard />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <FileList />
      </TabPanel>
    </Box>
  );
}

export default TabNavigation;
