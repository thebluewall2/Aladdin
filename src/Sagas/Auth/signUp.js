import { take, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
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

export function* handleCustomerSignUp(data) {
  try {
    const userData = yield call(CustomerSignUp, data);
    const newUser = {
      name: data.name,
      userType: data.userType,
      phoneNo: data.phoneNo,
      address: data.address,
      email: data.email
    };
    firebase.database().ref(`Users/${data.userType}/${userData.uid}`)
      .set(newUser);

    yield put(ReduxActions.authUserSignUpSuccess());
    Actions.loginPage();
  } catch (error) {
    yield put(ReduxActions.authUserSignUpFail(error));
  }
}

export function CustomerSignUp(data) {
  return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
  .catch((error) => {
    throw error;//If fail dispatch error msg
  });
}


export function* handleVendorSignUp(data) {
  try {
  const userData = yield call(VendorSignUp, data);
  const newUser = {
      companyName: data.companyName,
      name: data.name,
      phoneNo: data.phoneNo,
      officeNo: data.officeNo,
      address: data.address,
      postcode: data.postcode,
      city: data.city,
      services: data.services//might remove this to have another section to add
    };
  firebase.database().ref(`Users/${data.userType}/${userData.uid}`)
    .set(newUser);

  yield put(ReduxActions.authUserSignUpSuccess());
  Actions.loginPage();
  } catch (error) {
    yield put(ReduxActions.authUserSignUpFail(error));
  }
}

export function VendorSignUp(data) {
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
  .catch((error) => {
    throw error;//If fail dispatch error msg
  });
}
