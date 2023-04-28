import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Modal,
  Select,
  FormControl,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Typography,
  FormControlLabel,
  Switch
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { publishEventsToCommunityGroupsAction } from '../../../store/actions/eventsActions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function EventShareModal({ eventId }) {
  const dispatch = useDispatch();
  const { currentSpace } = useSelector(({ spaces }) => spaces);
  const { spaceGroups: groups, spaceId } = currentSpace ?? {
    spaceGroups: [],
    spaceId: null
  };

  const filteredGroups = useMemo(
    () => groups.filter((group) => !group.hiddenSpaces.includes(spaceId)),
    [groups, spaceId]
  );

  const [groupToShare, setGroupsToShare] = useState([]);
  const [openedModal, setModalOpened] = useState(false);

  const handleChange = useCallback((event) => {
    const {
      target: { value }
    } = event;
    setGroupsToShare(typeof value === 'string' ? value.split(',') : value);
  }, []);

  const handleOpenModal = useCallback(() => {
    setModalOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpened(false);
    setGroupsToShare([]);
  }, []);

  const handleChooseAll = useCallback(
    (event) => {
      if (event.target.checked) {
        const result = filteredGroups.map((group) => group.groupId);
        setGroupsToShare(result);
      } else {
        setGroupsToShare([]);
      }
    },
    [filteredGroups]
  );

  const handleShareEventToGroups = useCallback(() => {
    dispatch(
      publishEventsToCommunityGroupsAction({
        event_id: eventId,
        groups_to_share: groupToShare
      })
    );
    setModalOpened(false);
    setGroupsToShare([]);
  }, [dispatch, eventId, groupToShare]);

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        startIcon={<ShareIcon />}
        onClick={handleOpenModal}
      >
        Share
      </Button>
      <Modal
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        open={openedModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ width: '90%', padding: '20px', background: '#ffffff' }}>
          <Typography align="center" variant="h6">
            Publish events
          </Typography>
          <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
            <InputLabel id="demo-multiple-name-label">
              Groups to share
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={groupToShare}
              onChange={handleChange}
              input={<OutlinedInput label="Group to share" />}
              MenuProps={MenuProps}
            >
              {filteredGroups.map(({ groupName, groupId }) => (
                <MenuItem key={groupId} value={groupId}>
                  {groupName}
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel
              control={<Switch size="medium" onChange={handleChooseAll} />}
              label="Choose all groups in community"
            />
          </FormControl>
          <Button
            disabled={!groupToShare.length}
            variant="contained"
            fullWidth
            sx={{ marginTop: '20px' }}
            onClick={handleShareEventToGroups}
          >
            Publish
          </Button>
        </Box>
      </Modal>
    </>
  );
}

EventShareModal.propTypes = {
  eventId: PropTypes.string
};

export default EventShareModal;
