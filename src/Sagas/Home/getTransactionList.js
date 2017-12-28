import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchGetTransactionList() {
  while (true) {
    const { userType, userUID, previousDate } = yield take(Types.HOME_GET_TRANSACTION_LIST_ATTEMPT);
    yield call(handleGetTransactionList, userType, userUID, previousDate);
  }
}

export function* handleGetTransactionList(userType, userUID, previousDate) {
  try {
    let transactionList;
    if (previousDate === null) {
      transactionList = yield call(getTransactionList, userType, userUID);
    } else {
      transactionList = yield call(getAppendedTransactionList, userType, userUID, previousDate);
    }
    ReduxActions.getTransactionListSuccess(transactionList);
  } catch (error) {
    ReduxActions.getTransactionListFailure(new Error("Error while getting transactions"));
  }
}

export function getTransactionList(userType, userUID) {
  const ref = firebase.database().ref(`Users/${userType}/${userUID}/transactions`);
  const transactionList = [];
  ref.orderByChild(`orderByDate`).limitToFirst(4).on('child_added', (transaction => {
    const trx = transaction.val();
    trx.transactionUID = transaction.key;
    transactionList.push(trx);
  }));
  return transactionList;
}

export function getAppendedTransactionList(userType, userUID, previousDate) {
  const ref = firebase.database().ref(`Users/${userType}/${userUID}/transactions`);
  const transactionList = [];
  ref.orderByChild(`orderByDate`).startAt(-previousDate).limitToFirst(4).on('child_added', (transaction => {
    const trx = transaction.val();
    trx.transactionUID = transaction.key;
    transactionList.push(trx);
  }));
  return transactionList;
}