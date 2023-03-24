import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography, IconButton } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';

import './UserCard.css';

function UserCard({
  avatarSrc,
  firstName,
  lastName,
  telegramUsername,
  description,
}) {
  const userCredentials = `${firstName ?? ''} ${lastName ?? ''}`;

  // TODO: Max amount of symbols is 140 symbols such as in Telegram bio.
  const emptyDescription =
    '32 y.o. Front-end Engineer | Currently in Asia |32 y.o. Front-end Engineer | Currently in Asia |32 y.o. Front-end Engineer | Currently in As';

  return (
    <div className="cardHolder">
      <div className="cardBody">
        <div className="userProfilePhoto">
          <Avatar className="userPhoto" src={avatarSrc} />
        </div>
        <div className="userInfo">
          <Typography className="userDataTitle" variant="h6">
            {userCredentials}
          </Typography>
          <Typography className="userDataDescription" variant="body2">
            {description.length ? description : emptyDescription}
          </Typography>
        </div>
      </div>
      <div className="cardFooter">
        <div className="linkGroup">
          <IconButton
            href={`https://t.me/${telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
          </IconButton>
        </div>
      </div>
    </div>
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
