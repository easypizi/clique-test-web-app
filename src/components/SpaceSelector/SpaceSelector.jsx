import React, { useState, useCallback, useEffect } from 'react';
import store from 'store2';
import { useDispatch, useSelector } from 'react-redux';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import { getSpace } from '../../store/actions/spaceActions';

function SpaceSelector() {
  const dispatch = useDispatch();
  const { userSpaces, currentSpace } = useSelector((state) => state.spaces);
  const storedLastChosenCommunity = store.session.get('last_opened_space');

  // TODO: add default prechoosen community space
  const [choosenSpace, setChoosenSpace] = useState(
    storedLastChosenCommunity ?? (userSpaces && userSpaces[0]?.space_id) ?? ''
  );
  const handleChangeSpace = useCallback(
    (event) => {
      setChoosenSpace(event.target.value);
      dispatch(getSpace(event.target.value));
      if (event.target.value !== '') {
        store.session.set('last_opened_space', event.target.value);
      }
    },
    [dispatch]
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
