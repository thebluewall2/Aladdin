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
      case 'auth/invalid-email': {
        errorMsg = 'Invalid email. Please enter a valid email';
        break;
      }
      case 'Location not found': {
        errorMsg = 'Location not found. Please try again';
        break;
      }
      default: {
        errorMsg = 'Something went wrong, please try again later';
      }
    }

    const ref = firebase.database().ref(`PhoneNumbers/${data.userType}/${data.phoneNo}`);
    ref.remove();
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
          email: data.email,
          SignUpDate: firebase.database.ServerValue.TIMESTAMP,
        }
    })
  );
}


export function* VendorInfo(data, userData, coordinates) {
    yield call(create, `Users/${data.userType}/${userData.uid}`, () => ({
      [`Users/${data.userType}/${userData.uid}`]:
        {
          companyName: data.companyName,
          companyRegistrationNumber: data.companyRegNumber,
          name: data.name,
          icNumber: data.icNo,
          email: data.email,
          phoneNo: data.phoneNo,
          officeNo: data.officeNo,
          address: `${data.addressOne} ${data.addressTwo}`,
          postcode: data.postcode,
          services: data.categories,
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
          awards: data.awards,
          SignUpDate: firebase.database.ServerValue.TIMESTAMP,
          ApprovalStatus: 'Unapproved',
        }
    })
  );

  for (var category in data.categories) {
    for (let count = 0; count < data.categories[category].length; count++) {
      yield call(setVendorServices, category, data.categories[category][count], data, userData.uid, coordinates);
    }
  }
}

export function* setVendorServices(category, subcategory, data, uid, coordinates) {
  yield call(create, `Services/${category}/${subcategory}`, () => ({
      [`Services/${category}/${subcategory}/vendors/${uid}`]:
        {
          address: `${data.addressOne} ${data.addressTwo}`,
          name: data.name,
          coordinates
        }
    })
  );
}

export function getCoordinatesFromAddress(address) {
  Geocoder.setApiKey(Config.googleGeocoderAPI);

  const location = Geocoder.getFromLocation(address)
    .then(json => json.results[0].geometry.location)
    .catch((error) => console.log(error));

  return location;
}
