import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import Types from '../../Redux/Auth/types';


export function* watchSignUp() {
  while (true) {
    const { userData } = yield take(Types.AUTH_SIGN_UP_ATTEMPT);
    yield call(handleSignUp, userData);
  }
}

export function* handleSignUp(userData) {
  //userData
  //name: string,
  //userType: 'string' ('user' or 'vendor')
  //phoneNo: 'int'
  //address: 'string'
  //email: 'string'
  console.log(userData);
}
