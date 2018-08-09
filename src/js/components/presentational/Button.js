import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, text, id }) => (
    <button onClick={onClick} id={id}>{text}</button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Button;