import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ className }, ...props) => {
    return (<button {...props} className={`button ` + className} />);
}

export default Button;


Button.propTypes = {
    className: PropTypes.string,
}