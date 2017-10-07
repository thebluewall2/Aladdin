import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchLoginUser() {
  while (true) {
    const { email, password } = yield take(Types.AUTH_LOGIN_USER);
    yield call(handleLoginUser, email, password);
  }
}

export function handleLoginUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      handleUserLoginSuccess(user);
    })
    .catch((error) => {
      handleUserLoginFail(error);
    });
}


export function* handleUserLoginSuccess(user) {
  console.log(user);
  yield put(ReduxActions.userLoginSuccess());
}

export function* handleUserLoginFail(error) {
  console.log(error);
  yield put(ReduxActions.userLoginFail(error));
}
