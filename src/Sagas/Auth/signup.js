import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchSignUpUser() {
  while (true) {
    const { data } = yield take(Types.AUTH_SIGNUP_USER);
    yield call(handleSignUpUser, data);
  }
}

export function handleSignUpUser(data) {
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      handleUserSignUpSuccess(user, data);
    })
    .catch((error) => {
      handleUserSignUpFail(error);
    });
}


export function* handleUserSignUpSuccess(data) {
  const currentUser = firebase.auth();
  firebase.database().ref(`Users/${currentUser.uid}/user`)
  .push({ data.Name, data.PhoneNumber, data.Location, data.Email, data.Checkbox });


  yield put(ReduxActions.userSignUpSuccess());
}

export function* handleUserSignUpFail(error) {
  console.log(error);
  yield put(ReduxActions.userSignUpFail(error));
}
