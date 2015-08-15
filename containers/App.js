import React, { Component } from 'react';
import ShengJi from './ShengJi';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <ShengJi /> }
      </Provider>
    );
  }
}
