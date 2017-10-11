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
    const userData = yield call(firebaseAuth, email, password);

    //LEE : once I login, dispatch this action back to Redux to all reducers, received at Redux/Auth/reducer.js
    yield put(ReduxActions.userLoginSuccess(userData));
    Actions.home();
  } catch (error) {
    //LEE : if error with login, the above action won't be dispatched and the below will be dispatched
    yield put(ReduxActions.userLoginFail(error));
  }
}

export function firebaseAuth(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => { throw error; });
}
