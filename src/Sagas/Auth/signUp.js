import { take, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { get, create } from 'firebase-saga';
import Geocoder from 'react-native-geocoding';

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

    yield call(SignUp, data);
    yield put(ReduxActions.authUserSignUpSuccess());

    Actions.loginPage();
  } catch (error) {
    console.error(error);
    yield put(ReduxActions.authUserSignUpFail(error));
  }
}

export function* CheckPhoneNumber(data) {
  const phoneNo = yield call(get, `PhoneNumbers/${data.userType}`, data.phoneNo);

  if (phoneNo === null) {
    yield call(create, `PhoneNumbers/${data.userType}/${data.phoneNo}`, () => ({
                [`PhoneNumbers/${data.userType}/${data.phoneNo}`]: { email: data.email }
              })
            );
  } else {
    const err = new Error("Phone number in use!");

    throw err;
  }
}

export function* SignUp(data) {
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
  const userAddress = {
    streetName: data.address,
    city: data.city,
    state: data.state,
    postcode: data.postcode
  };

  const coordinates = yield call(getCoordinatesFromAddress, userAddress);

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
          coordinates,
          email: data.email
        }
    })
  );
}


export function* VendorInfo(data, userData) {
  try {
    const userAddress = {
      streetName: `${data.addressOne} ${data.addressTwo}`,
      city: data.city,
      state: data.state,
      postcode: data.postcode
    };

    const coordinates = yield call(getCoordinatesFromAddress, userAddress);

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
          coordinates,
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
            coordinates,
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

export function getCoordinatesFromAddress(address) {
  Geocoder.setApiKey('AIzaSyDiQJNqCwJXrP4yp8MB-5xnxbCEV4oyRt0');
  const addressToString = `${address.streetName} ${address.city} ${address.postcode} ${address.state}`;

  const location = Geocoder.getFromLocation(addressToString)
    .then(json => json.results[0].geometry.location)
    .catch((error) => console.log(error));

  return location;
}
