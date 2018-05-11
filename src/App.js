import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import Router from './Router';
import reducers from './Redux/';
import Sagas from './Sagas';
import configureStore from './Services/configureStore';

class App extends Component {
  componentWillMount() {
    this.startUpFirebase();

    this.store = configureStore(reducers, Sagas);
  }

  startUpFirebase = () => {
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
    return (
      <Provider store={this.store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
