import React, { useMemo, useRef, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CircularProgress, Typography, Box } from '@mui/material';

import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';
import MessagesFilters from './elements/MessagesFilters';

import prepareMessages from './helpers/prepareMessages';
import MessageCard from './elements/MessageCard';

function MessageBoard() {
  const filtersRef = useRef(null);

  const { currentSpace, isSpaceLoading } = useSelector(({ spaces }) => spaces);
  const { currentUser } = useSelector(({ user }) => user);
  const { activeFilters } = useSelector(({ messages }) => messages);

  const { spaceMessages, spaceOwner } = currentSpace ?? {
    spaceMessages: [],
    spaceOwner: null
  };

  const { user_id: userId } = currentUser ?? { user_id: null };

  const [offsetHeight, setOffset] = useState(0);

  const isLoading = useMemo(
    () => isSpaceLoading && !currentSpace,
    [currentSpace, isSpaceLoading]
  );

  const preparedMessages = useMemo(
    () => prepareMessages(spaceMessages, spaceOwner === userId),
    [spaceMessages, spaceOwner, userId]
  );

  const filteredMessages = useMemo(() => {
    if (!activeFilters.length) {
      return preparedMessages;
    }
    return (
      preparedMessages &&
      preparedMessages.filter((message) =>
        message.tags.some((tag) => activeFilters.includes(tag))
      )
    );
  }, [activeFilters, preparedMessages]);

  useLayoutEffect(() => {
    if (filtersRef.current) {
      const height = filtersRef.current.offsetHeight;
      setOffset(height);
    }
  }, [currentSpace]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
          }}
        />
      ) : (
        <Box sx={{ height: '100%', paddingBottom: '10px' }}>
          <div ref={filtersRef}>
            <MessagesFilters />
          </div>
          {spaceMessages && spaceMessages.length ? (
            <ScrollableContainer
              style={{
                padding: '20px 2px 0 2px',
                height: `calc(100% - ${offsetHeight + 5}px)`,
                gap: '10px',
                marginTop: '5px'
              }}
            >
              {filteredMessages &&
                filteredMessages.map((message) => (
                  <MessageCard
                    key={`${message.id}_${message.groupId}`}
                    {...{ ...message, selectedFilters: activeFilters }}
                  />
                ))}

              {filteredMessages && filteredMessages.length > 2 && (
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
              No messages has been found. Please try to choose other space
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default MessageBoard;
