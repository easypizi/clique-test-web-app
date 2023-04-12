/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Chip,
  Box
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { setActiveFiltersAction } from '../../../store/actions/messagesActions';
import { updateSpaceAction } from '../../../store/actions/spaceActions';
import compareFilterArrays from '../helpers/compareFilters';

function MessagesFilters() {
  const dispatch = useDispatch();
  const { currentSpace } = useSelector((state) => state.spaces);
  const { activeFilters } = useSelector((state) => state.messages);
  const { currentUser } = useSelector((state) => state.currentUser);

  const [selectedFilters, setSelectedFilters] = useState(activeFilters);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const { spaceHashtags, spaceOwner, spaceId } = currentSpace;
  const { user_id: userId } = currentUser;

  const isSpaceOwner = useMemo(
    () => spaceOwner === userId,
    [spaceOwner, userId]
  );

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setNewTag('');
  }, []);

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleSettingNewTag = (event) => {
    setNewTag(event.target.value);
  };

  const handleNewTagSend = useCallback(() => {
    const tagsArray = [...spaceHashtags, newTag];
    const updateData = {
      space_id: spaceId,
      space_message_hashtags: tagsArray
    };
    dispatch(updateSpaceAction(updateData));
    setModalOpen(false);
    setNewTag('');
  }, [dispatch, newTag, spaceHashtags, spaceId]);

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

  const handleDeleteChip = useCallback(
    (tag) => {
      const tagsArray = spaceHashtags.filter((item) => item !== tag);
      const updateData = {
        space_id: spaceId,
        space_message_hashtags: tagsArray
      };

      dispatch(updateSpaceAction(updateData));
    },
    [dispatch, spaceHashtags, spaceId]
  );

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

  const renderModal = useCallback(
    () => (
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Add new hashtag for parsing</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-tag-input-field"
            label="New tag: "
            fullWidth
            value={newTag}
            onChange={handleSettingNewTag}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleNewTagSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [handleModalClose, handleNewTagSend, isModalOpen, newTag]
  );

  useEffect(() => {
    if (!compareFilterArrays(selectedFilters, activeFilters)) {
      dispatch(setActiveFiltersAction(selectedFilters));
    }
  }, [activeFilters, dispatch, selectedFilters]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {renderFilterGroup()}
      {isSpaceOwner && spaceHashtags.length < 10 ? (
        <Chip
          icon={<AddIcon />}
          label="Add new hashtag"
          variant="outlined"
          size="small"
          onClick={handleModalOpen}
        />
      ) : null}
      {isSpaceOwner && renderModal()}
    </Box>
  );
}

export default MessagesFilters;
