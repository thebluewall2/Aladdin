import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { get } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';


export function* watchVendorData() {
  while (true) {
    const { vendorUID } = yield take(Types.HOME_GET_VENDOR_DATA_ATTEMPT);
      yield call(handleGetVendorData, vendorUID);
    }
}

export function* handleGetVendorData(vendorUID) {
  try {
   const vendorData = yield call(get, 'Users/vendor/', vendorUID);
   vendorData.vendorUID = vendorUID;
   if (vendorData === null) {
     throw new Error('Vendor does not exist!');
   }
   ReduxActions.homeGetVendorDataSuccess(vendorData);
  } catch (error) {
    ReduxActions.homeGetVendorDataFailure(error);
  }
}
