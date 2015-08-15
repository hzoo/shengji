import _ from 'lodash';
import Utils from '../lib/Utils';
import {
  SELECT_CARD,
  DEAL_CARDS
} from '../constants/ActionTypes';

// TODO: assuming no trump suit, no trump number
function cardSort(a, b) {
  if (a.suit > b.suit) {
    return -1;
  } else if (a.suit < b.suit) {
    return 1;
  } else {
    if (a.value > b.value) {
      return -1;
    } else if (a.value < b.value) {
      return 1;
    } else {
      return 0;
    }
  }
}

const testHand = _.take(Utils.genDecks(), 27).sort(cardSort);

testHand.forEach(card => card.selected = false);

// initialize to []
const initialState = testHand;

export default function cards(state = initialState, action) {
  switch (action.type) {
  case SELECT_CARD:
    return state.map(card =>
      card.id === action.id ?
        { ...card, selected: !card.selected } :
        card
    );
  case DEAL_CARDS:
    return state.length === 0 ? action.cards : state;
  default:
    return state;
  }
}
