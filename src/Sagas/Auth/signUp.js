import { take, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { get, create } from 'firebase-saga';

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
    yield call(CheckPhoneNumber, data);
    console.log("checked phone no");
    yield call(SignUp, data);
    yield put(ReduxActions.authUserSignUpSuccess());

    Actions.loginPage();
  } catch (error) {
    yield put(ReduxActions.authUserSignUpFail(error));
  }
}

export function* CheckPhoneNumber(data) {
  console.log("checking phone no");
  const phoneNo = yield call(get, `PhoneNumbers/${data.userType}`, data.phoneNo);
  console.log(phoneNo);
  if (phoneNo === null) {
    console.log('Go ahead');
    yield call(create, `PhoneNumbers/${data.userType}/${data.phoneNo}`, () => ({
                [`PhoneNumbers/${data.userType}/${data.phoneNo}`]: { email: data.email }
              })
            );
  } else {
    console.log('Phone number in use!');
    const err = new Error("Phone number in use!");
    console.log(err);
    throw err;
  }
}

export function* SignUp(data) {
  console.log(data);
  const userData = yield call(firebaseSignUp, data);
  if (data.userType === 'customer') {
    yield call(CustomerInfo, data, userData);
  } else if (data.userType === 'vendor') {
    yield call(VendorInfo, data, userData);
  }
}

export function firebaseSignUp(data) {
  const userData = firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
  .catch((error) => {
    console.log(error.message);
    throw error;//If fail dispatch error msg
  });
  return userData;
}

export function* CustomerInfo(data, userData) {
  yield call(create, `Users/${data.userType}/${userData.uid}`, () => ({
      [`Users/${data.userType}/${userData.uid}`]:
        {
          name: data.name,
          userType: data.userType,
          phoneNo: data.phoneNo,
          address: data.address,
          postcode: data.postcode,
          city: data.city,
          state: data.state,
          email: data.email
        }
    })
  );
}


export function* VendorInfo(data, userData) {
  try {
    console.log(data);
  yield call(create, `Users/${data.userType}/${userData.uid}`, () => ({
      [`Users/${data.userType}/${userData.uid}`]:
        {
          companyName: data.companyName,
          name: data.name,
          phoneNo: data.phoneNo,
          officeNo: data.officeNo,
          address: `${data.addressOne} ${data.addressTwo}`,
          postcode: data.postcode,
          services: data.subcategories,
          city: data.city,
          state: data.state,
          yearsOfExp: data.yearsOfExp,
          yearsOfCompany: data.yearsOfCompany,
          noOfStaff: data.noOfStaff,
          awards: data.awards
        }
    })
  );
  for (let count = 0; count < data.subcategories.length; count++) {
    yield call(create, `Services/${data.subcategories[count].categoryName}/${data.subcategories[count].subcategory}`, () => ({
        [`Services/${data.subcategories[count].categoryName}/${data.subcategories[count].subcategory}/vendors/${userData.uid}`]:
          {
            address: `${data.addressOne} ${data.addressTwo}`,
            name: data.name
          }
      })
    );
  }

  yield put(ReduxActions.authUserSignUpSuccess());
  Actions.loginPage();
  } catch (error) {
    yield put(ReduxActions.authUserSignUpFail(error));
  }
}
