import { take, call, put } from 'redux-saga/effects';

import { update, get } from 'firebase-saga';
import Geocoder from 'react-native-geocoding';
import { Actions } from 'react-native-router-flux';

import Config from '../../Services/config';
import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Settings/types';
import { showToast } from '../../Services/helpers';

export function* watchEditProfile() {
  while (true) {
    const { userType, userUID, profileInfo } = yield take(Types.SETTINGS_EDIT_PROFILE_ATTEMPT);
    yield call(handleEditProfile, userType, userUID, profileInfo);
  }
}

export function* handleEditProfile(userType, userUID, profileInfo) {
  try {
    let newProfileInfo = profileInfo;
    const userInfo = yield call(get, `Users/${userType}`, userUID);

    const isAddressSame = yield call(checkAddress, profileInfo, userInfo);

    if (!isAddressSame) {
      let addressToCheck = `${profileInfo.address} ${profileInfo.city} ${profileInfo.postcode} ${profileInfo.state}`;
      let coordinates = yield call(getCoordinates, addressToCheck);

      if (!coordinates) {
        addressToCheck = `${profileInfo.city} ${profileInfo.postcode} ${profileInfo.state}`;
        coordinates = yield call(getCoordinates, addressToCheck);

        if (!coordinates) {
          yield put(ReduxActions.settingsEditProfileFailure("Address cannot be found. Please try again."));
          return;
        }
      }

      newProfileInfo = {
        ...newProfileInfo,
        coordinates,
      };
    }

    yield call(update, `Users/${userType}/`, `${userUID}`,
    {
      ...newProfileInfo
    });

    yield call(updateReduxState, userType, userUID);
    showToast("Profile updated");
    yield put(ReduxActions.settingsEditProfileSuccess());
    Actions.pop();
  } catch (error) {
    console.log(error);
    yield put(ReduxActions.settingsEditProfileFailure("Failed to edit profile. Please try again later."));
  }
}

export function checkAddress(profileInfo, userInfo) {
  const newAddress = `${profileInfo.address} ${profileInfo.city} ${profileInfo.postcode} ${profileInfo.state}`;
  const oldAddress = `${userInfo.address} ${userInfo.city} ${userInfo.postcode} ${userInfo.state}`;

  return newAddress === oldAddress;
}

export function getCoordinates(address) {
  Geocoder.setApiKey(Config.googleGeocoderAPI);

  const location = Geocoder.getFromLocation(address)
    .then(json => json.results[0].geometry.location)
    .catch(error => console.log(error));

  return location;
}

export function* updateReduxState(userType, userUID) {
  const userInfo = yield call(get, `Users/${userType}`, userUID);

  yield put(ReduxActions.authUpdateProfile(userInfo));
}
