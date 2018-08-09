import React from "react";
import PropTypes from "prop-types";

const Cards = (props) => (
        <div class="d-flex flex-row">
        {props.cards.map((c, i) => {
            return (
                <img key={i} src={"/src/img/"+c.suit.charAt(0).toLocaleLowerCase()+c.rank+".png"} className="img-fluid img-thumbnail" />
            )
        })}
        </div>
);

Cards.propTypes = {
    cards: PropTypes.array.isRequired
};

export default Cards;