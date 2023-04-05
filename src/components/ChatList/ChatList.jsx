import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatCard from './elements/ChatCard/ChatCard';
import Search from '../Search/Search';

const ChatListWrapper = styled('div')({
  height: '100%',
  overflow: 'hidden'
});

const ChatListContainer = styled('div')({
  height: 'calc(100% - 64px)',
  overflow: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '2px',
  marginTop: '20px'
});

function ChatList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentSpace, isSpacesLoading } = useSelector((state) => state.spaces);

  const groups = currentSpace?.spaceGroups;

  const filteredGroups = useMemo(
    () =>
      groups &&
      groups.filter((group) =>
        group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [groups, searchTerm]
  );

  return (
    <ChatListWrapper>
      {isSpacesLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box sx={{ height: '100%', maxHeight: 'calc(100vh - 120px)' }}>
          <Search onSearch={setSearchTerm} />
          <ChatListContainer>
            {filteredGroups && filteredGroups.length ? (
              filteredGroups.map((group) => (
                <ChatCard key={group.groupId} {...group} />
              ))
            ) : (
              <Typography variant="body1">
                No groups found by this title
              </Typography>
            )}
          </ChatListContainer>
        </Box>
      )}
    </ChatListWrapper>
  );
}

export default ChatList;
