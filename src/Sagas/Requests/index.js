import { fork } from 'redux-saga/effects';

import { watchGetTransactionList } from './getTransactionList';
import { watchGetSingleTransaction } from './getSingleTransaction';
import { watchGetPaymentInfo } from './getFullPaymentInfo';
import { watchMakePayment } from './makePayment';
import { watchCreateReview } from './createReview';
import { watchVendorSelectTime } from './vendorSelectTime';
import { watchCompleteTransactions } from './completeTransaction';
import { watchRejectService } from './rejectService';
import { watchUploadImage } from './uploadImage';

export default (api) => {
  function* rootSaga() {
    yield fork(watchGetTransactionList);
    yield fork(watchGetSingleTransaction);
    yield fork(watchGetPaymentInfo);
    yield fork(watchMakePayment);
    yield fork(watchCreateReview);
    yield fork(watchVendorSelectTime, api);
    yield fork(watchCompleteTransactions, api);
    yield fork(watchRejectService, api);
    yield fork(watchUploadImage);
  }

  return {
    rootSaga
  };
};
