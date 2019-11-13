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
            displayCards: [],
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
        const cards = [];

        this.state.suits.forEach(suit => {
            this.state.ranks.forEach(rank => {
                cards.push(new this.Card(suit, rank));
            });
        });

        this.setState({
            cards,
            displayCards: cards,
            suit: "" 
        });
    }

    shuffleCards() {
        let swap;
        let temp;
        let cards = this.state.displayCards;
        let rand = new Randomizer({ seed : Date.now() });

        // Fisher–Yates shuffle
        for(let i = cards.length - 1; i > 0; i--) {
            swap = Math.floor(rand.random() * i);
            temp = cards[i];
            cards[i] = cards[swap];
            cards[swap] = temp;
        }

        this.setState({
            displayCards: cards
        });
    }

    sortCards() {
        // pigeonhole sort
        const arr = this.state.displayCards;
        const suits = this.state.suits;
        const holes = new Array(suits.length);

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

        this.setState({ displayCards: holes.reduce((a, b) => a.concat(b), []) });
    }

    getCardsBySuit(event) {
        const cards = this.state.cards;
        let displayCards = [];

        this.setState({
            suit: event.target.value 
        }, () => {
            cards.forEach(card => {
                if(card.suit === this.state.suit) displayCards.push(card);
                else if(!this.state.suit) displayCards = cards;
            });

            this.setState({ displayCards });
        });
    }

    componentWillMount() {
        this.generateDeck();
    }

    componentDidMount() {
        this.shuffleCards();
    }

    render() {
        const { suits, suit, displayCards } = this.state;

        return (
            <div>
                <Button
                    text="Shuffle"
                    id="shuffle-button"
                    onClick={this.shuffleCards}
                />
                <Button
                    text="Sort"
                    id="sort-button"
                    onClick={this.sortCards}
                />
                <Select
                    placeholder="Choose a suit to filter by"
                    id="suit-selector"
                    options={suits}
                    selectedOption={suit}
                    onChange={this.getCardsBySuit}
                />
                <Button
                    text="Reset"
                    id="reset-button"
                    onClick={this.generateDeck}
                />
                <Cards
                    cards={displayCards}
                />
            </div>
        );
    }
}

export default CardsContainer;

const wrapper = document.getElementById("cards-container");

wrapper ? ReactDOM.render(<CardsContainer />, wrapper) : false;