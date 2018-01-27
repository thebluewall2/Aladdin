import { call, take, put } from 'redux-saga/effects';
import Geocoder from 'react-native-geocoding';
import { Actions } from 'react-native-router-flux'

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';
import Config from '../../Services/config';

export function* watchGetCoordinates() {
  while (true) {
    const { address } = yield take(Types.HOME_GET_COORDINATES_ATTEMPT);
    yield call(handleGetCoordinates, address);
  }
}

export function* handleGetCoordinates(addressAttempt) {
  const { address, city, postcode, state } = addressAttempt;
  const addressToString = `${address} ${city} ${postcode} ${state}`;

  let coordinates = yield call(getCoordinates, addressToString);

  if (!coordinates) {
    //if no coordinates found, try with city
    coordinates = yield call(getCoordinates, `${city} ${postcode} ${state}`);
  }

  if (!coordinates) {
    const errorMsg = "Location not found. Please try again.";

    yield put(ReduxActions.homeGetCoordinatesFailure(errorMsg));
  } else {
      const addressToReturn = {
        ...addressAttempt,
        coordinates,
      };

      yield put(ReduxActions.authAddNewAddress(addressToReturn));
      yield put(ReduxActions.homeGetCoordinatesSuccess());

      Actions.pop();
  }
}

export function getCoordinates(address) {
  Geocoder.setApiKey(Config.googleGeocoderAPI);

  const location = Geocoder.getFromLocation(address)
    .then(json => json.results[0].geometry.location)
    .catch(error => console.log(error));

  return location;
}
