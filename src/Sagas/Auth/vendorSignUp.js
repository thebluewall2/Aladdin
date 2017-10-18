import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchSignUpVendor() {
  while (true) {
    const { userData } = yield take(Types.AUTH_VENDOR_SIGNUP_ATTEMPT);
    yield call(handleSignUp, userData);
  }
}

export function handleSignUp(data) {
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      handleVendorSignUpSuccess(user, data);//If success store other details
    })
    .catch((error) => {
      handleVendorSignUpFail(error);//If fail dispatch error msg
    });
}


export function* handleVendorSignUpSuccess(data) {
  const currentUser = firebase.auth();
//`Users/vendor/${currentUser.uid}`

  yield put(ReduxActions.vendorSignUpSuccess());
}

export function* handleVendorSignUpFail(error) {
  console.log(error);
  yield put(ReduxActions.vendorSignUpFail(error));
}
