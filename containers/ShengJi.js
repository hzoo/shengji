import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import PlayingField from '../components/PlayingField';
import Actions from '../components/Actions';
import Hand from '../components/Hand';
import * as CardActions from '../actions/CardActions';

export default class ShengJi extends Component {
  render() {
    return (
      <Connector select={state => ({ cards: state.cards })}>
        {this.renderChild}
      </Connector>
    );
  }

  renderChild({ cards, dispatch }) {
    const actions = bindActionCreators(CardActions, dispatch);
    return (
      <div className={'Shengji'}>
        <PlayingField />
        <Actions />
        <Hand cards={cards} actions={actions} />
      </div>
    );
  }
}
