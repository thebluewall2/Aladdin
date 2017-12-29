import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { get } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';


export function* watchGetTransactionData() {
  while (true) {
    const { userType, transactionUID } = yield take(Types.REQ_GET_TRANSACTION_DATA_ATTEMPT);
      yield call(handleGetTransactionData, userType, transactionUID);
    }
}

export function* handleGetTransactionData(userType, transactionUID) {
  try {
    const TransactionData = yield call(get, `Users/${userType}/transactions`, transactionUID);
    TransactionData.transactionUID = transactionUID;
    if (TransactionData === null) {
      throw new Error('Cannot find transaction!');
    }
    ReduxActions.homeGetTransactionDataSuccess(TransactionData);
   } catch (error) {
     ReduxActions.homeGetTransactionDataFailure(error);
  }
}
