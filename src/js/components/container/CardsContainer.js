import React, { Component } from "react";
import ReactDOM from "react-dom";

// import from utils and components/presentational
import Cards from "../presentational/Cards";
import Button from "../presentational/Button";
import Select from "../presentational/Select";
import Randomizer from "../../utils/Randomizer";

class CardsContainer extends Component {
    constructor() {
        super();

        this.state = {
            cards: [],
            ranks: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
            suits: ["Diamonds", "Clubs", "Hearts", "Spades"],
            suit: ""
        };

        this.generateDeck = this.generateDeck.bind(this);
        this.shuffleCards = this.shuffleCards.bind(this);
        this.getCardsBySuit = this.getCardsBySuit.bind(this);
        this.sortCards = this.sortCards.bind(this);
    }

    Card(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    generateDeck() {
        let cards = [];

        this.state.suits.forEach(suit => {
            this.state.ranks.forEach(rank => {
                cards.push(new this.Card(suit, rank));
            });
        });

        this.setState({
            cards: cards
        });
    }

    shuffleCards() {
        let swap;
        let temp;
        let sCards = this.state.cards;
        let rand = new Randomizer({ seed : Date.now() });

        // Fisher–Yates shuffle
        for(let i = sCards.length - 1; i > 0; i--) {
            swap = Math.floor(rand.random() * i);
            temp = sCards[i];
            sCards[i] = sCards[swap];
            sCards[swap] = temp;
        }

        this.setState({
            cards: sCards
        });
    }

    sortCards() {
        // pigeonhole sort
        let arr = this.state.cards;
        let suits = this.state.suits;
        let holes = new Array(suits.length);

        arr.forEach((val) => {
            suits.forEach((suit, j) => {
                if(val.suit === suit) {
                    if(holes[j]) holes[j].push(val);
                    else holes[j] = [val];
                }
            });
        });

        holes.forEach((hole) => {
            hole.sort((a, b) => {
                return a.rank - b.rank;
            });
        });

        this.setState({ cards: holes.reduce((a, b) => a.concat(b), []) });
    }

    getCardsBySuit(event) {
        let suitedCards = [];
        let sCards = this.state.cards;

        this.setState({
            suit: event.target.value
        }, () => {
            sCards.forEach(card => {
                if(card.suit === this.state.suit) suitedCards.push(card);
            });

            this.setState({ cards: suitedCards });
        });
    }

    componentWillMount() {
        this.generateDeck();
    }

    componentDidMount() {
        this.shuffleCards();
    }

    render() {
        const { cards, suits } = this.state;

        return (
            <div>
                <Button
                    text="Shuffle Me!"
                    id="shuffle-button"
                    onClick={this.shuffleCards}
                />
                <Button
                    text="Sort Me!"
                    id="sort-button"
                    onClick={this.sortCards}
                />
                <Select
                    placeholder="Choose a suit to filter by"
                    id="suit-selector"
                    options={suits}
                    onChange={this.getCardsBySuit}
                />
                <Button
                    text="Reset Me!"
                    id="reset-button"
                    onClick={this.generateDeck}
                />
                <Cards
                    cards={cards}
                />
            </div>
        );
    }
}

export default CardsContainer;

const wrapper = document.getElementById("cards-container");

wrapper ? ReactDOM.render(<CardsContainer />, wrapper) : false;