import React, { useMemo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Typography, Avatar, Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { updateGroupData } from '../../../store/actions/groupsActions';
import getColorByType from '../helpers/getColorByType';

const ChatItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  color: inherit;
  flex-grow: 1;
  box-shadow: inset 0px 1px 0 0px rgb(0, 0, 0, 0.1),
    inset 0px -1px 0 0px rgb(0, 0, 0, 0.1);
`;

function ChatCard({
  id,
  spaceId,
  canBeDeleted,
  type: groupType,
  name: groupName,
  link: groupLink,
  isHiddenByAdmin,
  groupHiddenSpaces
}) {
  const dispatch = useDispatch();

  const [isButtonLocked, setIsButtonLocked] = useState(false);
  const [isVisible, setVisibility] = useState(true);

  const color = useMemo(() => getColorByType(groupType), [groupType]);

  const letters = useMemo(() => {
    const groupNameArray = groupName && groupName.length && groupName.split(' ');
    const result = groupNameArray.map((part, index) => {
      if (index <= 1) {
        return part[0].toUpperCase();
      }
      return '';
    });
    return result.join('');
  }, [groupName]);

  const handleHideGroup = useCallback(
    (e) => {
      e.stopPropagation();
      setVisibility(false);
      if (isButtonLocked) {
        return;
      }
      if (spaceId) {
        setIsButtonLocked(true);
        const updatedArray = new Set(groupHiddenSpaces);
        updatedArray.add(spaceId);

        const updateData = {
          group_id: id,
          group_hidden_spaces: [...updatedArray]
        };

        dispatch(updateGroupData(updateData, spaceId));
      }
    },
    [isButtonLocked, spaceId, groupHiddenSpaces, id, dispatch]
  );

  const handleUnhideGroup = useCallback(
    (e) => {
      e.stopPropagation();
      setVisibility(false);
      if (isButtonLocked) {
        return;
      }
      if (spaceId) {
        setIsButtonLocked(true);
        const updatedHiddenSpace = groupHiddenSpaces.filter(
          (space) => space !== spaceId
        );

        const updateData = {
          group_id: id,
          group_hidden_spaces: updatedHiddenSpace
        };

        dispatch(updateGroupData(updateData, spaceId));
      }
    },
    [isButtonLocked, spaceId, groupHiddenSpaces, id, dispatch]
  );

  return (
    <Box
      sx={{
        position: 'relative',
        display: isVisible ? 'flex' : 'none',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <ChatItem to={groupLink}>
        <Avatar
          sx={{
            background: color,
            width: 60,
            height: 60,
            marginRight: '10px'
          }}
        >
          {letters}
        </Avatar>
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
      {canBeDeleted && (
        <IconButton
          sx={{
            width: 40,
            height: 40,
            marginLeft: '10px',
            flexShrink: 0
          }}
          color="primary"
          onClick={
            isHiddenByAdmin
              ? (e) => handleUnhideGroup(e)
              : (e) => handleHideGroup(e)
          }
        >
          {isHiddenByAdmin ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      )}
    </Box>
  );
}

ChatCard.propTypes = {
  id: PropTypes.string,
  isHiddenByAdmin: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
  groupHiddenSpaces: PropTypes.arrayOf(PropTypes.string),
  canBeDeleted: PropTypes.bool,
  spaceId: PropTypes.string
};

export default ChatCard;
