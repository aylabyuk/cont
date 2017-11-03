import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ContinuousLogsheet from './components/ContinuousLogsheet';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <ContinuousLogsheet />
      </Provider>
    );
  }
}

export default App;
