/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Select } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

function EventShareModal() {
  const { currentSpace } = useSelector(({ spaces }) => spaces);

  const handleShareEventToGroups = useCallback(() => {}, []);

  const groups = currentSpace.spaceGroups;

  //   console.log(groups);

  // const [openModal, setModalOpened] = useState(false);

  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<ShareIcon />}
      onClick={handleShareEventToGroups}
    >
      Share
    </Button>
  );
}

export default EventShareModal;
