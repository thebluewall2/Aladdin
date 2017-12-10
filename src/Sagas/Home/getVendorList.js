import { take, call } from 'redux-saga/effects';

import { get } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchGetVendorList() {
  while (true) {
    const { category, subcategory } = yield take(Types.HOME_GET_VENDOR_LIST_ATTEMPT);
    yield call(handleGetVendorList, category, subcategory);
  }
}

export function* handleGetVendorList(category, subcategory) {
  console.log(category);
  console.log(subcategory);

  try {
    const listOfVendorsFromFirebase = yield call(get, `Services/${category}`, subcategory);
    let listOfVendor = [];

    Object.keys(listOfVendorsFromFirebase.vendors)
      .map(vendorUID => {
          listOfVendor.push({
            vendorUID,
            name: listOfVendorsFromFirebase.vendors[vendorUID].name,
            coordinates: listOfVendorsFromFirebase.vendors[vendorUID].coordinates,
          });
      });

    ReduxActions.getGetVendorListSuccess(listOfVendor);
  } catch (error) {
    const err = new Error("No Vendor Found!");
    ReduxActions.getGetVendorListFailure(err);
    }
}
