import { fork } from 'redux-saga/effects';

import { watchGetVendorList } from './getVendorList';
import { watchGetAllServices } from './getAllService';

export default () => {
  function* rootSaga() {
    yield fork(watchGetVendorList);
    yield fork(watchGetAllServices);
  }

  return {
    rootSaga
  };
};
