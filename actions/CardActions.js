import * as types from '../constants/ActionTypes';

export function selectCard(id) {
  return {
    type: types.SELECT_CARD,
    id
  };
}

export function dealCards(cards) {
  return {
    type: types.DEAL_CARDS,
    cards
  };
}
