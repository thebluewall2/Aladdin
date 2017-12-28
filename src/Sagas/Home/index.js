import { fork } from 'redux-saga/effects';

import { watchGetVendorList } from './getVendorList';
import { watchGetAllServices } from './getAllService';
import { watchGetVendorData } from './getVendorData';
import { watchCreateOrUpdateTransaction } from './createTransaction';
import { watchGetCoordinates } from './getCoordinates';

export default () => {
  function* rootSaga() {
    yield fork(watchGetVendorList);
    yield fork(watchGetAllServices);
    yield fork(watchGetVendorData);
    yield fork(watchCreateOrUpdateTransaction);
    yield fork(watchGetCoordinates);
  }

  return {
    rootSaga
  };
};
