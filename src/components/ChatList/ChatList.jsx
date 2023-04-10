import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress, Box } from '@mui/material';
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';
import ChatCard from './elements/ChatCard/ChatCard';
import Search from '../Search/Search';

function ChatList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentSpace, isSpacesLoading } = useSelector((state) => state.spaces);

  const groups = currentSpace?.spaceGroups;

  const filteredGroups = useMemo(() => {
    if (!groups) return [];
    return groups.filter(({ groupName, groupType }) =>
      [groupName, groupType].some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [groups, searchTerm]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isSpacesLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box
          sx={{
            height: '100%',
            paddingBottom: '10px'
          }}
        >
          <Search onSearch={setSearchTerm} />
          {filteredGroups && filteredGroups.length ? (
            <ScrollableContainer
              style={{
                padding: '10px 2px 0 2px',
                height: 'calc(100% - 40px)',
                gap: '10px',
                marginTop: '5px'
              }}
            >
              {filteredGroups.map((group) => (
                <ChatCard key={group.groupId} {...group} />
              ))}
              {filteredGroups && filteredGroups.length > 5 && (
                <div
                  style={{ width: '100%', height: '300px', flexShrink: 0 }}
                />
              )}
            </ScrollableContainer>
          ) : (
            <Typography
              variant="body1"
              sx={{ marginTop: '20px', textAlign: 'center' }}
            >
              No users has been found
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ChatList;
