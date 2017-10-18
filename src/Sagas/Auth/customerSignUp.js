import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchSignUpUser() {
  while (true) {
    const { userData } = yield take(Types.AUTH_SIGN_UP_ATTEMPT);
    yield call(handleSignUp, userData);
  }
}

export function handleSignUp(data) {
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      handleUserSignUpSuccess(user, data);//If success store other details
    })
    .catch((error) => {
      handleUserSignUpFail(error);//If fail dispatch error msg
    });
}


export function* handleUserSignUpSuccess(data) {
  const currentUser = firebase.auth();
  const newUser = {
    name: data.name,
    userType: data.userType,
    phonoNo: data.phoneNo,
    address: data.address,
    email: data.email,
    checked: true,
  };
  console.log(newUser);
  firebase.database().ref(`Users/customer/${currentUser.uid}`)
    .push(newUser);

  yield put(ReduxActions.userSignUpSuccess());
}

export function* handleUserSignUpFail(error) {
  console.log(error);
  yield put(ReduxActions.userSignUpFail(error));
}
