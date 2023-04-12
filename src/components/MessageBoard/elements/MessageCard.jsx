/* eslint-disable no-cond-assign */
/* eslint-disable react/no-array-index-key */

import React, { useCallback, useMemo } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import { Typography, IconButton, Box } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import DeleteIcon from '@mui/icons-material/Delete';

import LazyAvatar from '../../LazyAvatar/LazyAvatar';

function MessageCard({
  canBeDeleted,
  date,
  groupId,
  id,
  link,
  text,
  userName,
  userPhoto,
  selectedFilters
}) {
  const timestampToDateTime = useCallback(
    (timestamp, timezone) =>
      moment(timestamp * 1000)
        .tz(timezone)
        .format('DD/MM/YYYY HH:mm'),
    []
  );

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );

  const handleDeleteMessage = useCallback(() => {
    // TODO: Удаление сообщений только для админа
  }, []);

  const preparedMessageText = useMemo(() => {
    const hashtaggedFiltersSet = new Set(
      selectedFilters.map((tag) => `#${tag}`)
    );
    const regex = /#[\wа-яёА-ЯЁa-zA-Z]+/g;
    let match;
    let lastIndex = 0;
    const result = [];

    while ((match = regex.exec(text))) {
      const { index } = match;
      const hashtag = match[0];
      const textBefore = text.slice(lastIndex, index);

      if (textBefore) {
        result.push(textBefore);
      }

      result.push(hashtag);
      lastIndex = index + hashtag.length;
    }

    const textAfter = text.slice(lastIndex);
    if (textAfter) {
      result.push(textAfter);
    }

    return result.reduce((acc, item, index) => {
      if (hashtaggedFiltersSet.has(item.toLowerCase())) {
        return acc.concat(
          <span key={`${item}_${index}`} style={{ background: 'lightBlue' }}>
            {item}
          </span>
        );
      }
      return acc.concat(item);
    }, []);
  }, [text, selectedFilters]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '10px',
        paddingBottom: '30px',
        borderRadius: '4px',
        boxShadow: '0.5px 0.5px 1px 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ marginRight: '10px' }}>
        <LazyAvatar
          src={userPhoto}
          alt="MessageUserPhoto"
          sx={{ width: 40, height: 40 }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
        <Typography variant="body1">{userName}</Typography>
        <Typography variant="body2">{preparedMessageText}</Typography>
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          marginLeft: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        {canBeDeleted && (
          <IconButton
            color="primary"
            onClick={() => handleDeleteMessage(groupId, id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon />
        </IconButton>
      </Box>
      <Typography
        sx={{ position: 'absolute', right: '10px', bottom: '5px' }}
        variant="caption"
      >
        {timestampToDateTime(date, timezone)}
      </Typography>
    </Box>
  );
}

MessageCard.propTypes = {
  canBeDeleted: PropTypes.bool,
  date: PropTypes.number,
  groupId: PropTypes.string,
  id: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  userName: PropTypes.string,
  userPhoto: PropTypes.string,
  selectedFilters: PropTypes.arrayOf(PropTypes.string)
};

export default MessageCard;
