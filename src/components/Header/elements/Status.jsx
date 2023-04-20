import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function Status({ status }) {
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    if (status !== '') {
      setCurrentStatus(status);

      const timer = setTimeout(() => {
        setCurrentStatus('');
      }, 2000);

      return () => clearTimeout(timer);
    }

    return '';
  }, [status]);

  return (
    <Typography sx={{ marginRight: 'auto' }} variant="body2">
      {currentStatus}
    </Typography>
  );
}

Status.propTypes = {
  status: PropTypes.string
};

export default Status;
