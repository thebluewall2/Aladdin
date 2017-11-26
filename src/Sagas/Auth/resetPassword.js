import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchResetPassword() {
  while (true) {
    const { email, userType } = yield take(Types.AUTH_RESET_PASSWORD_ATTEMPT);
    yield call(handleResetPassword, email, userType);
  }
}
//might not need userType
export function* handleResetPassword(email) {
  try {
    yield call(ResetPassword, email);
    yield put(ReduxActions.authResetPasswordSuccess());
    Actions.loginPage();
  } catch (error) {
    console.log(error);
    yield put(ReduxActions.authResetPasswordFail(error));
  }
}

export function ResetPassword(email) {
  firebase.auth().sendPasswordResetEmail(email)
  .catch((error) => {
    throw error;
  });
}
