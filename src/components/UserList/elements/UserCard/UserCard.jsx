import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography, IconButton } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import styled from '@emotion/styled';

const CardHolder = styled.div`
  max-width: 100%;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

const CardBody = styled.div`
  display: flex;
  overflow: hidden;
`;

const UserProfilePhoto = styled.div`
  margin-right: 20px;
`;

const UserPhoto = styled(Avatar)`
  width: 80px !important;
  height: 80px !important;
`;

const UserInfo = styled.div`
  width: 75%;
`;

const UserDataTitle = styled(Typography)`
  color: #094067;
  width: 75%;
`;

const UserDataDescription = styled(Typography)`
  color: #5f6c7b;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.2em !important;
  max-height: calc(1.2em * 3);
`;

const CardFooter = styled.div`
  margin-top: 5px;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const emptyDescription = 'User doesnt add any information about himself in bio';
function UserCard({
  avatarSrc,
  firstName,
  lastName,
  telegramUsername,
  description
}) {
  const userCredentials = useMemo(
    () => `${firstName ?? ''} ${lastName ?? ''}`,
    [firstName, lastName]
  );

  const userDescription = useMemo(
    () =>
      description && description.length > 0 ? description : emptyDescription,
    [description]
  );

  return (
    <CardHolder>
      <CardBody>
        <UserProfilePhoto>
          <UserPhoto src={avatarSrc} />
        </UserProfilePhoto>
        <UserInfo>
          <UserDataTitle variant="h6">{userCredentials}</UserDataTitle>
          <UserDataDescription variant="body2">
            {userDescription}
          </UserDataDescription>
        </UserInfo>
      </CardBody>
      <CardFooter>
        <LinkGroup>
          <IconButton
            href={`https://t.me/${telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
          </IconButton>
        </LinkGroup>
      </CardFooter>
    </CardHolder>
  );
}

UserCard.propTypes = {
  avatarSrc: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  telegramUsername: PropTypes.string,
  description: PropTypes.string
};

export default UserCard;
