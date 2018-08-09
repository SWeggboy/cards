import React, { Component } from "react";
import ReactDOM from "react-dom";
import Rand from "random-seed";

// import from utils and components/presentational
import Cards from "../presentational/Cards";
import Button from "../presentational/Button";
import Select from "../presentational/Select";

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
        let swap, temp, sCards = this.state.cards, rand = Rand.create();

        for(let i = sCards.length - 1; i > 0; i--) {
            // Fisher–Yates shuffle
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
        let arr = this.state.cards, suits = this.state.suits, holes = new Array(suits.length);

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
        let suitedCards = [], sCards = this.state.cards;

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
                <Cards
                    cards={cards}
                />
                <Button
                    text="Shuffle Me!"
                    onClick={this.shuffleCards}
                />
                <Button
                    text="Sort Me!"
                    onClick={this.sortCards}
                />
                <Button
                    text="Reset Me!"
                    onClick={this.generateDeck}
                />
                <Select
                    placeholder="Choose a suit to filter by"
                    id="suit-selector"
                    options={suits}
                    onChange={this.getCardsBySuit}
                />
            </div>
        );
    }
}

export default CardsContainer;

const wrapper = document.getElementById("cards-container");

wrapper ? ReactDOM.render(<CardsContainer />, wrapper) : false;