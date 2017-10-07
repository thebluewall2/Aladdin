import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import createSagaMiddleware from 'redux-saga';

import Router from './Router';
import reducers from './Redux/';
import Sagas from './Sagas';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCoeUXmwEIwUdkF4BWZKLVaSGRcrQPLkvg',
      authDomain: 'aladdinapp-942fe.firebaseapp.com',
      databaseURL: 'https://aladdinapp-942fe.firebaseio.com',
      projectId: 'aladdinapp-942fe',
      storageBucket: 'aladdinapp-942fe.appspot.com',
      messagingSenderId: '617243251381'
    };

    firebase.initializeApp(config);
  }

  render() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(Sagas);

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
