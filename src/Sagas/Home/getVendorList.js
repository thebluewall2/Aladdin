import { take, call } from 'redux-saga/effects';

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
    console.log(category);
    console.log(subcategory);
    console.log(userAddress);
    const listOfVendorsFromFirebase = yield call(get, `Services/${category}`, subcategory.id);
    let listOfVendor = [];
    console.log(listOfVendorsFromFirebase);
    Object.keys(listOfVendorsFromFirebase.vendors)
      .map(vendorUID => {
          listOfVendor.push({
            vendorUID,
            name: listOfVendorsFromFirebase.vendors[vendorUID].name,
            coordinates: listOfVendorsFromFirebase.vendors[vendorUID].coordinates,
          });
      });
      console.log(listOfVendor);
    // ReduxActions.homeGetVendorListSuccess(listOfVendor);
  } catch (error) {
      const err = new Error("No Vendor Found!");

      ReduxActions.homeGetVendorListFailure(err);
  }
}
