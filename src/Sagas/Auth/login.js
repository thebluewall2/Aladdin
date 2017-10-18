import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchLoginUser() {
  while (true) {
    const { email, password } = yield take(Types.AUTH_LOGIN_USER);
    yield call(handleLoginUser, email, password);
  }
}

export function* handleLoginUser(email, password) {
  try {
    // validateEmail(email);
    const userData = yield call(firebaseAuth, email, password);

    //need to get data by userData.uid
    //need usertype from liew
    yield put(ReduxActions.authUserLoginSuccess(userData));
    Actions.home();
  } catch (error) {
    yield put(ReduxActions.authUserLoginFail(error));
  }
}

export function firebaseAuth(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => { throw error; });
}

export function* validateEmail(email) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email) {
    const error = "Email is Empty";
    yield put(ReduxActions.authUserLoginFail(error));
  } else if (reg.test(email) === false) {
    const error = "Email is Not Correct";
    yield put(ReduxActions.authUserLoginFail(error));
  }
}
