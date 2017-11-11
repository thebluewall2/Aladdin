import { fork } from 'redux-saga/effects';

import { watchGetVendorList } from './getVendorList';

export default () => {
  function* rootSaga() {
    yield fork(watchGetVendorList);
  }

  return {
    rootSaga
  };
};
