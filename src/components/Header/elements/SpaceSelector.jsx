import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import { getSpace } from '../../../store/actions/spaceActions';
import { updateCurrentUserData } from '../../../store/actions/userActions';

function SpaceSelector() {
  const dispatch = useDispatch();

  const { userSpaces, currentSpace, isSpaceLoading } = useSelector(
    ({ spaces }) => spaces
  );
  const { currentUser } = useSelector(({ user }) => user);

  const lastChosenSpace = currentUser?.user_last_chosen_space;
  const firstUserSpaceId = userSpaces?.[0]?.space_id ?? '';

  const [chosenSpace, setChosenSpace] = useState(
    lastChosenSpace || firstUserSpaceId
  );

  const createUpdateData = useCallback(
    (userId, selectedSpaceId) => ({
      user_id: userId,
      user_last_chosen_space: selectedSpaceId
    }),
    []
  );

  const updateLastChosenSpace = useCallback(
    (updateData) => {
      dispatch(updateCurrentUserData(updateData));
    },
    [dispatch]
  );

  const updateChosenSpace = useCallback(
    (newChosenSpace) => {
      setChosenSpace(newChosenSpace);
      if (
        currentUser &&
        newChosenSpace &&
        currentUser.user_last_chosen_space !== newChosenSpace
      ) {
        const updateData = createUpdateData(currentUser.user_id, newChosenSpace);
        updateLastChosenSpace(updateData);
      }
      dispatch(getSpace(newChosenSpace));
    },
    [currentUser, dispatch, createUpdateData, updateLastChosenSpace]
  );

  const handleSpaceChange = useCallback(
    (event) => {
      const newChosenSpace = event.target.value;
      if (!currentUser || !newChosenSpace) {
        setChosenSpace(newChosenSpace);
        dispatch(getSpace(newChosenSpace));
        return;
      }
      updateChosenSpace(newChosenSpace);
    },
    [currentUser, dispatch, updateChosenSpace]
  );

  useEffect(() => {
    if (!currentSpace && chosenSpace && !isSpaceLoading) {
      dispatch(getSpace(chosenSpace));
    }
  }, [chosenSpace, currentSpace, dispatch, isSpaceLoading]);

  if (!userSpaces) {
    return null;
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="space-choose-select-label">Space</InputLabel>
      <Select
        labelId="space-choose-select-label"
        id="space-choose-select"
        value={chosenSpace}
        label="Space"
        onChange={handleSpaceChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {userSpaces.map((spaceItem) => (
          <MenuItem key={spaceItem.space_id} value={spaceItem.space_id}>
            {spaceItem.space_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SpaceSelector;
