import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayingField from '../components/PlayingField';
import Actions from '../components/Actions';
import Hand from '../components/Hand';
import * as CardActions from '../actions/CardActions';

class ShengJi extends Component {
  render() {
    const { cards, dispatch } = this.props;
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

function mapState(state) {
  return { cards: state.cards };
}

export default connect(mapState)(ShengJi);

