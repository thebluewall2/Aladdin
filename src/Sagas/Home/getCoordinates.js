import { call, take, put } from 'redux-saga/effects';
import Geocoder from 'react-native-geocoding';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchGetCoordinates() {
  while (true) {
    const { address } = yield take(Types.HOME_GET_COORDINATES);
    yield call(handleGetCoordinates, address);
  }
}

export function* handleGetCoordinates(addressAttempt) {
  const { address, city, postcode, state } = addressAttempt;
  const addressToString = `${address} ${city} ${postcode} ${state}`;

  let coordinates = yield call(getCoordinates, addressToString);

  if (!coordinates) {
    //if no coordinates found, try with city
    coordinates = yield call(getCoordinates, `${city} ${state}`);
  }

  const addressToReturn = {
    ...addressAttempt,
    coordinates,
  };

  yield put(ReduxActions.authAddNewAddress(addressToReturn));
}

export function getCoordinates(address) {
  Geocoder.setApiKey('AIzaSyDiQJNqCwJXrP4yp8MB-5xnxbCEV4oyRt0');

  const location = Geocoder.getFromLocation(address)
    .then(json => json.results[0].geometry.location)
    .catch(error => console.log(error));

  return location;
}
