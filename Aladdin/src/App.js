import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import Router from './Router';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCZY7CQl7dfqkCjD2pFXn80IBDc8ji5OL4",
      authDomain: "aladdin-cce5a.firebaseapp.com",
      databaseURL: "https://aladdin-cce5a.firebaseio.com",
      projectId: "aladdin-cce5a",
      storageBucket: "",
      messagingSenderId: "813864855358"
    }

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
