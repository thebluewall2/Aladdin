import { fork } from 'redux-saga/effects';

import { watchGetTransactionList } from './getTransactionList';
import { watchGetPaymentInfo } from './getFullPaymentInfo';
import { watchMakePayment } from './makePayment';
import { watchCreateReview } from './createReview';

export default () => {
  function* rootSaga() {
    yield fork(watchGetTransactionList);
    yield fork(watchGetPaymentInfo);
    yield fork(watchMakePayment);
    yield fork(watchCreateReview);
  }

  return {
    rootSaga
  };
};
