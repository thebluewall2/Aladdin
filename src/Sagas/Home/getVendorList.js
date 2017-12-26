import { take, call, put } from 'redux-saga/effects';

import { get } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchGetVendorList() {
  while (true) {
    const { category, subcategory, userAddress } = yield take(Types.HOME_GET_VENDOR_LIST_ATTEMPT);
    yield call(handleGetVendorList, category, subcategory, userAddress);
  }
}

export function* handleGetVendorList(category, subcategory, userAddress) {
  try {
    const listOfVendorsFromFirebase = yield call(get, `Services/${category}`, subcategory.id);

    let listOfVendor = yield call(convertToArray, listOfVendorsFromFirebase);
    listOfVendor = yield call(getVendorReviews, listOfVendor);
    listOfVendor = yield call(getDistanceFromVendorList, userAddress, listOfVendor);

    yield put(ReduxActions.homeGetVendorListSuccess(listOfVendor));
  } catch (error) {
      const err = new Error("No Vendor Found!");
      yield put(ReduxActions.homeGetVendorListFailure(err));
  }
}

export function* getVendorReviews(listOfVendor) {
  let newListOfVendor = listOfVendor;

  for (let count = 0; count < listOfVendor.length; count++) {
    const reviewScoreFromFirebase = yield call(get, `Users/vendor/${listOfVendor[count].vendorUID}/reviews`, 'reviewScore');

      if (reviewScoreFromFirebase) {
        newListOfVendor[count].reviewScore =
          { totalReviews: reviewScoreFromFirebase.totalReviews,
            avgReviews: ((reviewScoreFromFirebase.totalScores / (reviewScoreFromFirebase.totalReviews)))
          };
      }
    }

    return newListOfVendor;
}

export function convertToArray(listOfVendorsFromFirebase) {
  let listOfVendor = [];

  Object.keys(listOfVendorsFromFirebase.vendors)
    .map(vendorUID => {
        listOfVendor.push({
          vendorUID,
          name: listOfVendorsFromFirebase.vendors[vendorUID].name,
          coordinates: listOfVendorsFromFirebase.vendors[vendorUID].coordinates,
        });
    });

    return listOfVendor;
}

export function getDistanceFromVendorList(userAddress, vendorList) {
  let newVendorList = [];

  const userLat = userAddress.coordinates.lat;
  const userLon = userAddress.coordinates.lng;

  vendorList.map((vendor) => {
    const vendorLat = vendor.coordinates.lat;
    const vendorLon = vendor.coordinates.lng;

    newVendorList.push({
      ...vendor,
      distance: getDistance(userLat, userLon, vendorLat, vendorLon)
    });
  });

  return newVendorList;
}

export function getDistance(lat1, lon1, lat2, lon2) {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;

  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;

  //convert to KM
  dist *= 1.609344;

  dist = Math.round(dist);

  return dist;
}
