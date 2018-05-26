import { take, call, put } from 'redux-saga/effects';
import { get } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';

export function* watchGetSingleTransaction() {
  while (true) {
    const { transactionUID } = yield take(Types.REQ_GET_SINGLE_TRANSACTION_ATTEMPT);
    yield call(handleGetSingleTransaction, transactionUID);
  }
}

export function* handleGetSingleTransaction(transactionUID) {
  try {
    const transaction = yield call(get, 'Transactions/', transactionUID);

    if (transaction) {
      yield put(ReduxActions.requestsGetSingleTransactionSuccess(transaction));
    } else {
      console.log(transaction);
      yield put(ReduxActions.requestsGetSingleTransactionFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ReduxActions.requestsGetSingleTransactionFailure());
  }
}
