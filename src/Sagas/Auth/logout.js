import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { remove } from 'firebase-saga';
import { resetGenericPassword } from 'react-native-keychain';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchLogout() {
  while (true) {
    const { userUID } = yield take(Types.AUTH_LOG_OUT);
    // console.log(userUID);
    yield call(handleLogout, userUID);
  }
}

export function* handleLogout(userUID) {
  firebase.auth().signOut();
  const userType = yield call(getUserTypeFromStorage);

  //remove password from user device, so autologin will not work when user reopens app
  resetGenericPassword();
  yield call(resetAsyncStorage);
  yield call(resetRedux);

  yield call(remove, `Users/${userType}/${userUID}`, 'fcmToken');

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

async function getUserTypeFromStorage() {
  const userType = await AsyncStorage.getItem('userType');
  if (userType) {
    return userType;
  }
  return null;
}
