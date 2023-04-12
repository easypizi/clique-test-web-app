/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Chip, Box } from '@mui/material';

import { setActiveFiltersAction } from '../../../store/actions/messagesActions';
import compareFilterArrays from '../helpers/compareFilters';

function MessagesFilters() {
  const dispatch = useDispatch();
  const { currentSpace } = useSelector((state) => state.spaces);
  const { activeFilters } = useSelector((state) => state.messages);
  const { currentUser } = useSelector((state) => state.currentUser);

  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  const { spaceHashtags, spaceOwner } = currentSpace;
  const { user_id: userId } = currentUser;

  const isSpaceOwner = useMemo(
    () => spaceOwner === userId,
    [spaceOwner, userId]
  );

  const handleSelectFilter = useCallback(
    (filter) => {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      } else {
        setSelectedFilters([...selectedFilters, filter]);
      }
    },
    [selectedFilters]
  );

  const handleDeleteChip = useCallback(() => {
    // TODO: Add function for deleting chip from the space
  }, []);

  const renderFilterGroup = useCallback(
    () =>
      spaceHashtags.map((tag, index) =>
        isSpaceOwner ? (
          <Chip
            key={`${tag}_${index}`}
            size="small"
            label={tag}
            onClick={() => handleSelectFilter(tag)}
            onDelete={() => handleDeleteChip(tag)}
            variant={
              selectedFilters.includes(`${tag}`) ? 'primary' : 'outlined'
            }
            color={selectedFilters.includes(`${tag}`) ? 'primary' : 'default'}
          />
        ) : (
          <Chip
            key={`${tag}_${index}`}
            size="small"
            label={tag}
            onClick={() => handleSelectFilter(tag)}
            variant={
              selectedFilters.includes(`${tag}`) ? 'primary' : 'outlined'
            }
            color={selectedFilters.includes(`${tag}`) ? 'primary' : 'default'}
          />
        )
      ),
    [
      handleDeleteChip,
      handleSelectFilter,
      isSpaceOwner,
      selectedFilters,
      spaceHashtags
    ]
  );

  // TODO: add control selector for space admin for adding new chips and deleting it

  // TODO: until it less than 10 chips add fake chip for adding data for space owner/ Make portal element for adding new chip;

  useEffect(() => {
    if (!compareFilterArrays(selectedFilters, activeFilters)) {
      dispatch(setActiveFiltersAction(selectedFilters));
    }
  }, [activeFilters, dispatch, selectedFilters]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {renderFilterGroup()}
    </Box>
  );
}

export default MessagesFilters;
