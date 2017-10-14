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

export function* handleResetPassword(email, userType) {



  //back to login page after resetting successfully
  Actions.loginPage();
}
