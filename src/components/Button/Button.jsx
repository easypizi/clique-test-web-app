import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

function Button({ className }, ...props) {
  // eslint-disable-next-line react/button-has-type
  return <button {...props} className={`button ${className}`} />;
}

export default Button;

Button.propTypes = {
  className: PropTypes.string,
};
