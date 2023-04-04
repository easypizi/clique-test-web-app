import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChatIcon from '@mui/icons-material/Chat';
import { Typography } from '@mui/material';

const ChatItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  color: inherit;

  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

function ChatCard({ groupName, groupLink, groupType = 'chat' }) {
  const isChannel = groupType === 'channel';

  return (
    <ChatItem to={groupLink}>
      <IconWrapper>
        {isChannel ? (
          <CampaignIcon sx={{ fontSize: 32 }} />
        ) : (
          <ChatIcon sx={{ fontSize: 32 }} />
        )}
      </IconWrapper>
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {groupName}
      </Typography>
    </ChatItem>
  );
}

ChatCard.propTypes = {
  groupName: PropTypes.string,
  groupLink: PropTypes.string,
  groupType: PropTypes.string
};

export default ChatCard;
