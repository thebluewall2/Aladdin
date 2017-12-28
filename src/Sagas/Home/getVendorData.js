import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { get } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';


export function* watchGetVendorData() {
  while (true) {
    const { vendorID } = yield take(Types.HOME_GET_VENDOR_DATA_ATTEMPT);
      yield call(handleGetVendorData, vendorID);
    }
}

export function* handleGetVendorData(vendorUID) {
  try {
   const vendorData = yield call(get, 'Users/vendor/', vendorUID);

   vendorData.vendorUID = vendorUID;

   if (vendorData === null) {
     throw new Error('Vendor does not exist!');
   }

   yield put(ReduxActions.homeGetVendorDataSuccess(vendorData));
  } catch (error) {
    yield put(ReduxActions.homeGetVendorDataFailure(error));
  }
}
