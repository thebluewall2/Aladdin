import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchUserSignUp() {
  while (true) {
    const { userData } = yield take(Types.AUTH_SIGN_UP_ATTEMPT);
    yield call(handleSignUp, userData);
  }
}

export function* handleSignUp(data) {
  if (data.userType === 'customer') {
    yield call(handleCustomerSignUp, data);
  } else if (data.userType === 'vendor') {
    yield call(handleVendorSignUp, data);
  }
}

export function handleCustomerSignUp(data) {
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      handleCustomerSignUpSuccess(user, data);//If success store other details
    })
    .catch((error) => {
      handleSignUpFail(error);//If fail dispatch error msg
    });
}

export function handleVendorSignUp(data) {
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      handleVendorSignUpSuccess(user, data);//If success store other details
    })
    .catch((error) => {
      handleSignUpFail(error);//If fail dispatch error msg
    });
}

export function* handleCustomerSignUpSuccess(data) {
  const currentUser = firebase.auth();
  const newUser = {
    name: data.name,
    userType: data.userType,
    phonoNo: data.phoneNo,
    address: data.address,
    email: data.email
  };
  console.log(newUser);
  firebase.database().ref(`Users/${data.userType}/${currentUser.uid}`)
    .push(newUser);

  yield put(ReduxActions.authUserSignUpSuccess());
}

export function* handleVendorSignUpSuccess(data) {
  const currentUser = firebase.auth();
  const newUser = {
      companyName: data.companyName,
      name: data.name,
      phoneNo: data.phoneNo,
      officeNo: data.officeNo,
      address: data.address,
      postcode: data.postcode,
      city: data.city,
      category: data.category
    };
    console.log(newUser);
    firebase.database().ref(`Users/${data.userType}/${currentUser.uid}`)
      .push(newUser);

  //LEE : pass in sign up success data, to be set in redux state,
  //should be the same data as the sign in data
  yield put(ReduxActions.authUserSignUpSuccess());
}

export function* handleSignUpFail(error) {
  console.log(error);
  yield put(ReduxActions.authUserSignUpFail(error));
}
