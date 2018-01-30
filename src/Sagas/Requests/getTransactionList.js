import { take, call, put } from 'redux-saga/effects';
import { getAll, get } from 'firebase-saga';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';

export function* watchGetTransactionList() {
  while (true) {
    const { userType, userUID } = yield take(Types.REQ_GET_TRANSACTION_LIST_ATTEMPT);
    yield call(handleGetTransactionList, userType, userUID);
  }
}

export function* handleGetTransactionList(userType, userUID) {
  try {
    const transactionList = yield call(getTransactionList, userType, userUID);

    yield put(ReduxActions.requestsGetTransactionListSuccess(transactionList));
  } catch (error) {
    yield put(ReduxActions.requestsGetTransactionListFailure(new Error("Error while getting transactions")));
  }
}

export function* getTransactionList(userType, userUID) {
  const listOfTransactionUIDFromFirebase = yield call(getAll, `Users/${userType}/${userUID}/transactions`);
  let listOfTransactionUID = [];
  let listOfTransactions = [];

  Object.keys(listOfTransactionUIDFromFirebase)
    .map(transactionUID => {
      listOfTransactionUID.push(transactionUID);
    });

  for (let i = 0; i < listOfTransactionUID.length; i++) {
    const transaction = yield call(get, 'Transactions/', listOfTransactionUID[i]);
    listOfTransactions.push({
      ...transaction,
      transactionUID: listOfTransactionUID[i],
    });
  }
  if (listOfTransactions === null) {
    return [];
  }

  listOfTransactions.sort((a, b) => a.createdDate - b.createdDate);
  
  return listOfTransactions;
}
