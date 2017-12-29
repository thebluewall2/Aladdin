import { fork } from 'redux-saga/effects';

import { watchGetTransactionList } from './getTransactionList';
import { watchGetTransactionData } from './getTransactionData';

export default () => {
  function* rootSaga() {
    yield fork(watchGetTransactionList);
    yield fork(watchGetTransactionData);
  }

  return {
    rootSaga
  };
};
