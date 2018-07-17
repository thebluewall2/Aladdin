import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { resetGenericPassword } from 'react-native-keychain';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchLogout() {
  while (true) {
    const { userUID } = yield take(Types.AUTH_LOG_OUT);
    // console.log(userUID);
    yield call(handleLogout);
  }
}

export function* handleLogout() {
  firebase.auth().signOut();

  //remove password from user device, so autologin will not work when user reopens app
  resetGenericPassword();
  yield call(resetAsyncStorage);
  yield call(resetRedux);

  Actions.auth({ type: 'reset' });
}

export function resetAsyncStorage() {
  const keys = ['settings', 'userType'];

  AsyncStorage.multiRemove(keys);
}

export function* resetRedux() {
  yield put(ReduxActions.homeResetRedux());
  yield put(ReduxActions.requestsResetRedux());
}
