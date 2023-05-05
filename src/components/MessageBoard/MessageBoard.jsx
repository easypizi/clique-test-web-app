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

  const isAdmin = useMemo(
    () => userId === currentSpace?.spaceOwner,
    [currentSpace?.spaceOwner, userId]
  );

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
                height: `calc(100% - ${offsetHeight - 2}px)`,
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
            <>
              <Typography
                variant="body1"
                sx={{ marginTop: '20px', textAlign: 'center' }}
              >
                Сообщений и публикаций не найдено.
              </Typography>
              {isAdmin && (
                <Typography
                  variant="body2"
                  sx={{ marginTop: '20px', textAlign: 'center' }}
                >
                  Добавьте теги для парсинга данных. Сообщения из всех групп
                  сообщества будут публиковаться тут, если в них присутствует
                  хотя бы один тег, из тех что вы добавили.
                </Typography>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default MessageBoard;
