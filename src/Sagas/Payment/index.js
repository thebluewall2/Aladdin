import { fork } from 'redux-saga/effects';

import { watchMakePayment } from './makePayment';

export default () => {
  function* rootSaga() {
    yield fork(watchMakePayment);
  }

  return {
    rootSaga
  };
};
