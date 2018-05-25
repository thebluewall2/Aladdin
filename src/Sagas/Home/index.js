import { fork } from 'redux-saga/effects';

import { watchGetVendorList } from './getVendorList';
import { watchGetAllServices } from './getAllService';
import { watchGetVendorData } from './getVendorData';
import { watchUserCreateBooking } from './userCreateBooking';
import { watchCreateOrUpdateTransaction } from './createTransaction';
import { watchGetCoordinates } from './getCoordinates';

export default (api) => {
  function* rootSaga() {
    yield fork(watchGetVendorList);
    yield fork(watchGetAllServices);
    yield fork(watchGetVendorData);
    yield fork(watchUserCreateBooking, api);
    yield fork(watchCreateOrUpdateTransaction, api);
    yield fork(watchGetCoordinates);
  }

  return {
    rootSaga
  };
};
