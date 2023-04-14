import React, { useMemo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { green, pink, blue, orange } from '@mui/material/colors';
import { Typography, Avatar, Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { getSpace } from '../../../store/actions/spaceActions';
import { updateGroupData } from '../../../store/actions/groupsActions';

const ChatItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  color: inherit;
  flex-grow: 1;
  box-shadow: inset 0px 1px 0 0px rgb(0, 0, 0, 0.1),
    inset 0px -1px 0 0px rgb(0, 0, 0, 0.1),
    inset 1px 0px 0 0px rgb(0, 0, 0, 0.1);
`;

function ChatCard({
  type: groupType,
  name: groupName,
  link: groupLink,
  id,
  isHiddenByAdmin,
  groupHiddenSpaces,
  canBeDeleted,
  spaceId
}) {
  const [isButtonLocked, setIsButtonLocked] = useState(false);

  const dispatch = useDispatch();

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

        dispatch(updateGroupData(updateData)).then(() => {
          dispatch(getSpace(spaceId));
        });
      }
    },
    [isButtonLocked, spaceId, groupHiddenSpaces, id, dispatch]
  );

  const handleUnhideGroup = useCallback(
    (e) => {
      e.stopPropagation();
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

        dispatch(updateGroupData(updateData)).then(() => {
          dispatch(getSpace(spaceId));
        });
      }
    },
    [isButtonLocked, spaceId, groupHiddenSpaces, id, dispatch]
  );

  const color = useCallback(() => {
    const values = [green, pink, blue, orange];
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }, []);

  return (
    <Box sx={{ position: 'relative', display: 'flex', width: '100%' }}>
      <ChatItem to={groupLink}>
        <Avatar
          sx={{
            background: color()[500],
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
          sx={{ position: 'absolute', right: 0, bottom: 0 }}
          color="primary"
          onClick={isHiddenByAdmin ? handleUnhideGroup : handleHideGroup}
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
