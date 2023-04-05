import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function LinkButton({
  children,
  to = '/',
  color = 'primary',
  variant = 'contained',
  ...rest
}) {
  return (
    <Button {...rest} component={Link} to={to} color={color} variant={variant}>
      {children}
    </Button>
  );
}

LinkButton.propTypes = {
  color: PropTypes.string,
  to: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node
};

export default LinkButton;
