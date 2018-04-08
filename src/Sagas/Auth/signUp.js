import { take, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { get, create } from 'firebase-saga';
import Geocoder from 'react-native-geocoding';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';
import { showToast } from '../../Services/helpers';
import Config from '../../Services/config';

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

    showToast("Sign up successful!");
    Actions.loginPage({ type: 'reset' });
  } catch (error) {
    console.log(error);
    let errorMsg;

    switch (error.code) {
      case 'Phone number in use': {
        errorMsg = 'Phone number already in use';
        break;
      }
      case 'auth/email-already-in-use': {
        errorMsg = 'Email already in use';
        break;
      }
      case 'auth/weak-password': {
        errorMsg = 'Password requires 6 characters and above';
        break;
      }
      case 'Location not found': {
        errorMsg = 'Location not found. Please try again';
        break;
      }
      default: {
        errorMsg = 'Something went wrong, please try again later';
        break;
      }
    }

    yield put(ReduxActions.authUserSignUpFail(errorMsg));
  }
}

export function* CheckPhoneNumber(data) {
  const phoneNo = yield call(get, `PhoneNumbers/${data.userType}`, data.phoneNo);

  if (phoneNo) {
    throw { code: 'Phone number in use' };
  }
}

export function* addPhoneNumber(data) {
  yield call(create, `PhoneNumbers/${data.userType}/${data.phoneNo}`, () => ({
              [`PhoneNumbers/${data.userType}/${data.phoneNo}`]: { email: data.email }
            })
  );
}

export function* SignUp(data) {
  //before signing up, let's check if address is valid
  let userAddressToString = `${data.address} ${data.city} ${data.postcode} ${data.state}`;
  let coordinates = yield call(getCoordinatesFromAddress, userAddressToString);

  if (!coordinates) {
    userAddressToString = `${data.city} ${data.postcode} ${data.state}`;
    coordinates = yield call(getCoordinatesFromAddress, userAddressToString);
  }

  if (!coordinates) {
    throw { code: 'Location not found' };
  } else {
    const userData = yield call(firebaseSignUp, data);
    yield call(addPhoneNumber, data);

    if (data.userType === 'customer') {
      yield call(CustomerInfo, data, userData, coordinates);
    } else if (data.userType === 'vendor') {
      yield call(VendorInfo, data, userData, coordinates);
    }
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

export function* CustomerInfo(data, userData, coordinates) {
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


export function* VendorInfo(data, userData, coordinates) {
  try {
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
          reviews: {
            totalReviews: 0,
            totalScores: 0
          },
          state: data.state,
          yearsOfExp: data.yearsOfExp,
          yearsOfCompany: data.yearsOfCompany,
          noOfStaff: data.noOfStaff,
          awards: data.awards
        }
    })
  );
  // for (let count = 0; count < data.subcategories.length; count++) {
  //   yield call(create, `Services/${data.subcategories[count].categoryName}/${data.subcategories[count].subcategory}`, () => ({
  //       [`Services/${data.subcategories[count].categoryName}/${data.subcategories[count].subcategory}/vendors/${userData.uid}`]:
  //         {
  //           coordinates,
  //           name: data.name
  //         }
  //     })
  //   );
  // }

  yield put(ReduxActions.authUserSignUpSuccess());
  Actions.loginPage();
  } catch (error) {
    yield put(ReduxActions.authUserSignUpFail(error));
  }
}

export function getCoordinatesFromAddress(address) {
  Geocoder.setApiKey(Config.googleGeocoderAPI);

  const location = Geocoder.getFromLocation(address)
    .then(json => json.results[0].geometry.location)
    .catch((error) => console.log(error));

  return location;
}
