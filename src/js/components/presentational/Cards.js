import React from "react";
import PropTypes from "prop-types";

const Cards = (props) => (
        <div className="d-flex flex-row flex-wrap">
        {props.cards.map((c, i) => {
            return (
                <img key={i} src={"/src/img/"+c.suit.charAt(0).toLocaleLowerCase()+c.rank+".png"} />
            )
        })}
        </div>
);

Cards.propTypes = {
    cards: PropTypes.array.isRequired
};

export default Cards;