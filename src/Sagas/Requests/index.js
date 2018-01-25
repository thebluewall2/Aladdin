import { fork } from 'redux-saga/effects';

import { watchGetTransactionList } from './getTransactionList';
import { watchGetTransactionData } from './getTransactionData';
import { watchMakePayment } from './makePayment';

export default () => {
  function* rootSaga() {
    yield fork(watchGetTransactionList);
    yield fork(watchGetTransactionData);
    yield fork(watchMakePayment);
  }

  return {
    rootSaga
  };
};
