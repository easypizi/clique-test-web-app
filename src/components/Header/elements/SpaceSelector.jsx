import React, { useState, useCallback, useEffect } from 'react';
import store from 'store2';
import { useDispatch, useSelector } from 'react-redux';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import { getSpace } from '../../../store/actions/spaceActions';
import { updateUserData } from '../../../store/actions/userActions';

function SpaceSelector() {
  const dispatch = useDispatch();
  const { userSpaces, currentSpace } = useSelector((state) => state.spaces);
  const { currentUser } = useSelector((state) => state.user);
  const storedLastChosenCommunity = store.session.get('last_opened_space');
  const [choosenSpace, setChoosenSpace] = useState(
    storedLastChosenCommunity ??
      currentUser?.user_last_chosen_space ??
      (userSpaces && userSpaces[0]?.space_id) ??
      ''
  );
  const handleChangeSpace = useCallback(
    (event) => {
      const chosenSpace = event.target.value;
      setChoosenSpace(chosenSpace);
      dispatch(getSpace(chosenSpace));
      if (chosenSpace !== '') {
        store.session.set('last_opened_space', chosenSpace);
      }

      if (currentUser && chosenSpace !== '') {
        const updateData = {
          user_id: currentUser.user_id,
          user_last_chosen_space: chosenSpace
        };

        dispatch(updateUserData(updateData));
      }
    },
    [currentUser, dispatch]
  );

  useEffect(() => {
    if (!currentSpace && choosenSpace) {
      dispatch(getSpace(choosenSpace));
    }
  }, [choosenSpace, currentSpace, dispatch]);

  if (!userSpaces) {
    return null;
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="space-choose-select-label">Space</InputLabel>
      <Select
        labelId="space-choose-select-label"
        id="space-choose-select"
        value={choosenSpace}
        label="Space"
        onChange={handleChangeSpace}
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
