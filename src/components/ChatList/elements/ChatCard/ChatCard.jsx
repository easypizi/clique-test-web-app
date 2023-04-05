import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { green, pink, blue, orange } from '@mui/material/colors';
import { Typography, Avatar, Box } from '@mui/material';

const ChatItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  color: inherit;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const color = () => {
  const values = [green, pink, blue, orange];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};

function ChatCard({ groupName, groupLink, groupType = 'chat' }) {
  const letters = `${groupName.split(' ')[0][0].toUpperCase()}${groupName
    .split(' ')[1][0]
    .toUpperCase()}`;

  return (
    <ChatItem to={groupLink}>
      <IconWrapper>
        <Avatar sx={{ background: color()[500], width: 60, height: 60 }}>
          {letters}
        </Avatar>
      </IconWrapper>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {groupName}
        </Typography>
        <Typography
          color="GrayText"
          variant="caption"
          sx={{ marginTop: '3px' }}
        >
          {`TYPE: ${groupType}`}
        </Typography>
      </Box>
    </ChatItem>
  );
}

ChatCard.propTypes = {
  groupName: PropTypes.string,
  groupLink: PropTypes.string,
  groupType: PropTypes.string
};

export default ChatCard;
