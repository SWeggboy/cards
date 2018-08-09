import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import CardsContainer from '../src/js/components/container/CardsContainer';

configure({ adapter: new Adapter() });

const cards = [{"suit":"Diamonds","rank":"1"},{"suit":"Diamonds","rank":"2"},{"suit":"Diamonds","rank":"3"},{"suit":"Diamonds","rank":"4"},{"suit":"Diamonds","rank":"5"},{"suit":"Diamonds","rank":"6"},{"suit":"Diamonds","rank":"7"},{"suit":"Diamonds","rank":"8"},{"suit":"Diamonds","rank":"9"},{"suit":"Diamonds","rank":"10"},{"suit":"Diamonds","rank":"11"},{"suit":"Diamonds","rank":"12"},{"suit":"Diamonds","rank":"13"},{"suit":"Clubs","rank":"1"},{"suit":"Clubs","rank":"2"},{"suit":"Clubs","rank":"3"},{"suit":"Clubs","rank":"4"},{"suit":"Clubs","rank":"5"},{"suit":"Clubs","rank":"6"},{"suit":"Clubs","rank":"7"},{"suit":"Clubs","rank":"8"},{"suit":"Clubs","rank":"9"},{"suit":"Clubs","rank":"10"},{"suit":"Clubs","rank":"11"},{"suit":"Clubs","rank":"12"},{"suit":"Clubs","rank":"13"},{"suit":"Hearts","rank":"1"},{"suit":"Hearts","rank":"2"},{"suit":"Hearts","rank":"3"},{"suit":"Hearts","rank":"4"},{"suit":"Hearts","rank":"5"},{"suit":"Hearts","rank":"6"},{"suit":"Hearts","rank":"7"},{"suit":"Hearts","rank":"8"},{"suit":"Hearts","rank":"9"},{"suit":"Hearts","rank":"10"},{"suit":"Hearts","rank":"11"},{"suit":"Hearts","rank":"12"},{"suit":"Hearts","rank":"13"},{"suit":"Spades","rank":"1"},{"suit":"Spades","rank":"2"},{"suit":"Spades","rank":"3"},{"suit":"Spades","rank":"4"},{"suit":"Spades","rank":"5"},{"suit":"Spades","rank":"6"},{"suit":"Spades","rank":"7"},{"suit":"Spades","rank":"8"},{"suit":"Spades","rank":"9"},{"suit":"Spades","rank":"10"},{"suit":"Spades","rank":"11"},{"suit":"Spades","rank":"12"},{"suit":"Spades","rank":"13"}];
const hearts = [{"suit":"Hearts","rank":"1"},{"suit":"Hearts","rank":"2"},{"suit":"Hearts","rank":"3"},{"suit":"Hearts","rank":"4"},{"suit":"Hearts","rank":"5"},{"suit":"Hearts","rank":"6"},{"suit":"Hearts","rank":"7"},{"suit":"Hearts","rank":"8"},{"suit":"Hearts","rank":"9"},{"suit":"Hearts","rank":"10"},{"suit":"Hearts","rank":"11"},{"suit":"Hearts","rank":"12"},{"suit":"Hearts","rank":"13"}];
const diamonds = [{"suit":"Diamonds","rank":"1"},{"suit":"Diamonds","rank":"2"},{"suit":"Diamonds","rank":"3"},{"suit":"Diamonds","rank":"4"},{"suit":"Diamonds","rank":"5"},{"suit":"Diamonds","rank":"6"},{"suit":"Diamonds","rank":"7"},{"suit":"Diamonds","rank":"8"},{"suit":"Diamonds","rank":"9"},{"suit":"Diamonds","rank":"10"},{"suit":"Diamonds","rank":"11"},{"suit":"Diamonds","rank":"12"},{"suit":"Diamonds","rank":"13"}];
const clubs = [{"suit":"Clubs","rank":"1"},{"suit":"Clubs","rank":"2"},{"suit":"Clubs","rank":"3"},{"suit":"Clubs","rank":"4"},{"suit":"Clubs","rank":"5"},{"suit":"Clubs","rank":"6"},{"suit":"Clubs","rank":"7"},{"suit":"Clubs","rank":"8"},{"suit":"Clubs","rank":"9"},{"suit":"Clubs","rank":"10"},{"suit":"Clubs","rank":"11"},{"suit":"Clubs","rank":"12"},{"suit":"Clubs","rank":"13"}];
const spades = [{"suit":"Spades","rank":"1"},{"suit":"Spades","rank":"2"},{"suit":"Spades","rank":"3"},{"suit":"Spades","rank":"4"},{"suit":"Spades","rank":"5"},{"suit":"Spades","rank":"6"},{"suit":"Spades","rank":"7"},{"suit":"Spades","rank":"8"},{"suit":"Spades","rank":"9"},{"suit":"Spades","rank":"10"},{"suit":"Spades","rank":"11"},{"suit":"Spades","rank":"12"},{"suit":"Spades","rank":"13"}];

describe('sort/rendering methods within CardCounter', () => {
    it('should render cards sorted Reset Me! button click', () => {
        const wrapper = shallow(<CardsContainer />);
        wrapper.find('#reset-button').simulate('click');
        expect(wrapper.state('cards')).toEqual(cards);
    });
    it('should render cards sorted on Sort Me! button click', () => {
        const wrapper = shallow(<CardsContainer />);
        wrapper.find('#sort-button').simulate('click');
        expect(wrapper.state('cards')).toEqual(cards);
    });
    it('should render cards shuffled on Shuffle Me! button click', () => {
        const wrapper = shallow(<CardsContainer />);
        const wCards = wrapper.state('cards');
        wrapper.find('#shuffle-button').simulate('click');
        cards.map(c => { // check if shuffled contains same cards as sorted
            expect(wCards).toContainEqual(c);
        });
        expect(wCards.length).toBe(cards.length); // check if length is same as sorted
        expect(wrapper.state('cards')).not.toEqual(cards); // one in a bazillion chance that shuffled may match sorted...
    });
    it('should return Hearts on Hearts selection', () => {
        const wrapper = shallow(<CardsContainer />);
        wrapper.find('#suit-selector').simulate('change',{target: {value: 'Hearts'}});
        expect(wrapper.state('cards').map(a => a.rank).sort()).toEqual(hearts.map(a => a.rank).sort());
    });
    it('should return Diamonds on Diamonds selection', () => {
        const wrapper = shallow(<CardsContainer />);
        wrapper.find('#suit-selector').simulate('change',{target: {value: 'Diamonds'}});
        expect(wrapper.state('cards').map(a => a.rank).sort()).toEqual(diamonds.map(a => a.rank).sort());
    });
    it('should return Clubs on Clubs selection', () => {
        const wrapper = shallow(<CardsContainer />);
        wrapper.find('#suit-selector').simulate('change',{target: {value: 'Clubs'}});
        expect(wrapper.state('cards').map(a => a.rank).sort()).toEqual(clubs.map(a => a.rank).sort());
    });
    it('should return Spades on Spades selection', () => {
        const wrapper = shallow(<CardsContainer />);
        wrapper.find('#suit-selector').simulate('change',{target: {value: 'Spades'}});
        expect(wrapper.state('cards').map(a => a.rank).sort()).toEqual(spades.map(a => a.rank).sort());
    });
});