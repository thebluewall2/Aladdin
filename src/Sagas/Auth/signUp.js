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
  try {
    const isSuccess = yield call(CheckAndSignUp, data);
console.log(isSuccess);
    if (isSuccess === false) {
      const error = new Error('PhoneNoUsed');
      error.code = "PhoneNoUsed";
      error.message = "Phone Number is use!";
      throw error;
    }
    yield put(ReduxActions.authUserSignUpSuccess());
    Actions.loginPage();
  } catch (error) {
    console.log(error);
    console.log("error");
    yield put(ReduxActions.authUserSignUpFail(error));
  }
}

export function* CheckAndSignUp(data) {
  firebase.database().ref(`Duplicates/${data.userType}/${data.phoneNo}`).set(data.email)
    .catch(() => {
      return false;
  });
  yield call(SignUp, data);
  return true;
}

export function* SignUp(data) {
  if (data.userType === 'customer') {
    const userData = yield call(CustomerSignUp, data);
    console.log(userData);
    yield call(CustomerInfo, data, userData);
  } else if (data.userType === 'vendor') {
    const userData = yield call(VendorSignUp, data);
    yield call(VendorInfo, data, userData);
  }
}


export function CustomerSignUp(data) {
  console.log(data.email, data.password);
  const userData = firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
  .catch((error) => {
    console.log(error.message);
    throw error;//If fail dispatch error msg
  });
  return userData;
}

export function CustomerInfo(data, userData) {
  const newUser = {
    name: data.name,
    userType: data.userType,
    phoneNo: data.phoneNo,
    address: data.address,
    email: data.email
  };
  firebase.database().ref(`Users/${data.userType}/${userData.uid}`)
    .set(newUser);
}

export function* VendorInfo(data, userData) {
  try{
  const newUser = {
      companyName: data.companyName,
      name: data.name,
      phoneNo: data.phoneNo,
      officeNo: data.officeNo,
      address: data.address,
      postcode: data.postcode,
      city: data.city,
      yearsOfExp: data.yearsOfExp,
      yearsOfCompany: data.yearsOfCompany,
      noOfStaff: data.noOfStaff,
      awards: data.awards
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
