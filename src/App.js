import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import createSagaMiddleware from 'redux-saga';

import Router from './Router';
import reducers from './Redux/';
import Sagas from './Sagas';
import Config from './Services/config';

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

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      firebase.app();
    }
  }

  render() {
    let middleware = [];
    const sagaMiddleware = createSagaMiddleware();
    middleware = [...middleware, sagaMiddleware];

    if (Config.reduxLoggerEnabled) {
      const { logger } = require('redux-logger');

      middleware.push(logger);
    }

    const store = createStore(reducers, {}, applyMiddleware(...middleware));
    sagaMiddleware.run(Sagas);

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
