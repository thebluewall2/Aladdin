import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { setGenericPassword } from 'react-native-keychain';

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
    const userData = yield call(firebaseAuth, email, password);
    setGenericPassword(email, password);
    
    yield put(ReduxActions.authUserLoginSuccess(userData));

    Actions.home();
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      error.message = "User Not Found";
    }

    yield put(ReduxActions.authUserLoginFail(error));
  }
}

export function firebaseAuth(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .catch((error) => { throw error; });
}
