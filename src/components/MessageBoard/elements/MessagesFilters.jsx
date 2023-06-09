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
  const { currentSpace } = useSelector(({ spaces }) => spaces);
  const { activeFilters } = useSelector(({ messages }) => messages);
  const { currentUser } = useSelector(({ user }) => user);
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTag, setNewTag] = useState('');
  const { spaceHashtags, spaceOwner, spaceId } = currentSpace ?? {
    spaceHashtags: [],
    spaceOwner: null,
    spaceId: null
  };
  const [currenthashTags, setCurrentHashtags] = useState(spaceHashtags);

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
    const tagsArray = [...new Set([...currenthashTags, newTag.toLowerCase()])];
    const updateData = {
      space_id: spaceId,
      space_message_hashtags: tagsArray
    };
    dispatch(updateSpaceAction(updateData));
    setCurrentHashtags(tagsArray);
    setModalOpen(false);
    setNewTag('');
  }, [currenthashTags, dispatch, newTag, spaceId]);

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
      const tagsArray = currenthashTags.filter((item) => item !== tag);
      const updateData = {
        space_id: spaceId,
        space_message_hashtags: tagsArray
      };

      setCurrentHashtags(tagsArray);
      if (selectedFilters.includes(tag)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== tag));
      }
      dispatch(updateSpaceAction(updateData));
    },
    [currenthashTags, dispatch, selectedFilters, spaceId]
  );

  const renderFilterGroup = useCallback(
    () =>
      currenthashTags &&
      currenthashTags.map((tag, index) =>
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
      currenthashTags,
      handleDeleteChip,
      handleSelectFilter,
      isSpaceOwner,
      selectedFilters
    ]
  );

  const renderModal = useCallback(
    () => (
      <Dialog
        maxWidth="xl"
        sx={{
          '.MuiDialog-container': {
            alignItems: 'self-start'
          },
          '.MuiDialog-paper': {
            width: '100%'
          }
        }}
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <DialogTitle>Создать новый тег</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-tag-input-field"
            label="Тег"
            fullWidth
            value={newTag}
            onChange={handleSettingNewTag}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '0 24px 20px' }}>
          <Button variant="outlined" onClick={handleModalClose}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleNewTagSend}>
            Добавить
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
          label="Добавить новый тег"
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
