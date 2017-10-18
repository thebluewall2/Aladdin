import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchResetPassword() {
  while (true) {
    const { email, userType } = yield take(Types.AUTH_RESET_PASSWORD);
    yield call(handleResetPassword, email, userType);
  }
}
//might not need userType
export function handleResetPassword(email) {
  const auth = firebase.getInstance();

  auth.sendPasswordResetEmail(email)
    .then(() => {
      handleResetPasswordSuccess();
    })
    .catch((error) => {
      handleResetPasswordFail(error);
    });
  //back to login page after resetting successfully
  //should notify user?
  Actions.loginPage();
}

export function* handleResetPasswordFail(error) {
  console.log(error);

  yield put(ReduxActions.resetPasswordFail(error));
}

export function* handleResetPasswordSuccess() {
  yield put(ReduxActions.resetPasswordSuccess());
}
