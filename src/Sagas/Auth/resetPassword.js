import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

import { showToast } from '../../Services/helpers';

export function* watchResetPassword() {
  while (true) {
    const { email, userType } = yield take(Types.AUTH_RESET_PASSWORD_ATTEMPT);
    yield call(handleResetPassword, email, userType);
  }
}
//might not need userType
export function* handleResetPassword(email) {
    const response = yield call(ResetPassword, email);

    if (response === 1) {
      yield put(ReduxActions.authResetPasswordSuccess());

      showToast("Reset link emailed! Please check your email.");
      Actions.pop();
    } else if (response.indexOf('badly formatted') > -1) {
      yield put(ReduxActions.authResetPasswordFail('Email address is invalid'));
    } else {
      yield put(ReduxActions.authResetPasswordFail('Something went wrong. Please try again'));
    }
}

export function ResetPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      return 1;
    })
    .catch((error) => {
      console.log(error);

      return error.message;
    });
}
