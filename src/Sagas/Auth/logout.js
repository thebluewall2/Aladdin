import { take, call } from 'redux-saga/effects';

import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import { resetGenericPassword } from 'react-native-keychain';

import Types from '../../Redux/Auth/types';


export function* watchLogout() {
  while (true) {
    yield take(Types.AUTH_LOG_OUT);

    yield call(handleLogout);
  }
}

export function handleLogout() {
  firebase.auth().signOut();

  //remove password from user device, so autologin will not work when user reopens app
  resetGenericPassword();

  Actions.pop();
  setTimeout(() =>
    Actions.landingPage()
  );
}
