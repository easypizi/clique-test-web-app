import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Checkbox,
  Input,
  TextareaAutosize,
  Button
} from '@mui/material';
import styled from '@emotion/styled';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const LinkInput = styled(Input)`
  margin-top: 10px;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Badge = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #eee;
`;

function UserProfile({
  userName,
  userSurName,
  userDescription,
  userLinks,
  userVisibility,
  userAvatar,
  userBadges = []
}) {
  const [name, setName] = useState(userName ?? '');
  const [surname, setSurname] = useState(userSurName ?? '');
  const [description, setDescription] = useState(userDescription ?? '');
  const [links, setLinks] = useState(userLinks ?? []);
  const [isVisible, setIsVisible] = useState(userVisibility ?? true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLinkChange = (event, index) => {
    const newLinks = [...links];
    newLinks[index] = event.target.value;
    setLinks(newLinks);
  };

  const handleIsVisibleChange = (event) => {
    setIsVisible(event.target.checked);
  };

  const handleUpdateClick = () => {
    // const updatedUser = {
    //   name,
    //   surname,
    //   description,
    //   links,
    //   isVisible
    // };
    // console.log(updatedUser);
    // отправка обновленных данных на сервер
  };

  return (
    <UserProfileContainer>
      <div>
        <Avatar src={userAvatar ?? ''} />
        <InputContainer>
          <Input value={name} onChange={handleNameChange} />
          <Input value={surname} onChange={handleSurnameChange} />
        </InputContainer>
      </div>
      <TextareaAutosize
        value={description}
        onChange={handleDescriptionChange}
        maxLength={140}
      />
      <div>
        <LinkInput
          value={links[0]}
          onChange={(event) => handleLinkChange(event, 0)}
        />
        <LinkInput
          value={links[1]}
          onChange={(event) => handleLinkChange(event, 1)}
        />
        <LinkInput
          value={links[2]}
          onChange={(event) => handleLinkChange(event, 2)}
        />
      </div>
      <Checkbox checked={isVisible} onChange={handleIsVisibleChange} />
      <Input value={userBadges.join(', ')} disabled />
      <BadgeContainer>
        {userBadges.map((badge) => (
          <Badge key={badge}>{badge}</Badge>
        ))}
      </BadgeContainer>
      <Button onClick={handleUpdateClick} variant="contained">
        Update
      </Button>
    </UserProfileContainer>
  );
}

UserProfile.propTypes = {
  userName: PropTypes.string,
  userSurName: PropTypes.string,
  userDescription: PropTypes.string,
  userLinks: PropTypes.arrayOf(PropTypes.string),
  userVisibility: PropTypes.bool,
  userAvatar: PropTypes.string,
  userBadges: PropTypes.arrayOf(PropTypes.string)
};

export default UserProfile;
