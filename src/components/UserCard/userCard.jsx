import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';

import './UserCard.css';

function UserCard({
  avatarSrc,
  firstName,
  lastName,
  telegramUsername,
  description,
}) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatarSrc} />}
        title={`${firstName} ${lastName}`}
        subheader={
          <IconButton
            href={`https://t.me/${telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  );
}

UserCard.propTypes = {
  avatarSrc: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  telegramUsername: PropTypes.string,
  description: PropTypes.string,
};

export default UserCard;
