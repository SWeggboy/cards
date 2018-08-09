import React from "react";
import PropTypes from "prop-types";

const Select = (props) => (
    <select
        onChange={props.onChange}
        id={props.name}
        value={props.selectedOption}
        className="custom-select mt-1 ml-1">
        <option value="">{props.placeholder}</option>
        {props.options.map(opt => {
            return (
                <option key={opt} value={opt}>{opt}</option>
            );
        })}
    </select>
);

Select.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string
};

export default Select;