import React from "react";
import PropTypes from "prop-types";

const Cards = ({ value }) => (
    <div className="card">{value}</div>
);

Cards.propTypes = {
    value: PropTypes.string.isRequired
};

export default Cards;