import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@mui/material';

import ChatCard from './elements/ChatCard/ChatCard';
import Search from '../Search/Search';

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
    [searchTerm, groups]
  );

  return (
    <div className="userlist">
      {isSpacesLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Search onSearch={setSearchTerm} />
          {filteredGroups && filteredGroups.length ? (
            filteredGroups.map((group) => (
              <ChatCard key={group.groupId} {...group} />
            ))
          ) : (
            <Typography variant="body1">
              No groups found by this title
            </Typography>
          )}
        </>
      )}
    </div>
  );
}

export default ChatList;
