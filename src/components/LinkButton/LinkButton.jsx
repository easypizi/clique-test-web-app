import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function LinkButton({ to = '/', children, color = 'primary', ...rest }) {
  return (
    <Button
      {...rest}
      component={Link}
      to={to}
      color={color}
      variant="contained"
    >
      {children}
    </Button>
  );
}

LinkButton.propTypes = {
  color: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node
};

export default LinkButton;
