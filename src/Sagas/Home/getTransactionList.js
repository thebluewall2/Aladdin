import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchGetTransactionList() {
  while (true) {
    const { userType, userUID, previousConfirmDate } = yield take(Types.HOME_GET_TRANSACTION_LIST_ATTEMPT);
    yield call(handleGetTransactionList, userType, userUID, previousConfirmDate);
  }
}

export function* handleGetTransactionList(userType, userUID, previousConfirmDate) {
  try {
    let listOfTransaction;
    if (previousConfirmDate === null) {
      listOfTransaction = yield call(getTransactionList, userType, userUID);
    } else {
      listOfTransaction = yield call(getAppendedTransactionList, userType, userUID, previousConfirmDate);
    }
    ReduxActions.getTransactionListSuccess(listOfTransaction);
  } catch (error) {
    ReduxActions.getTransactionListFailure(new Error("Error while getting transactions"));
  }
}

export function* getTransactionList(userType, userUID) {
  const ref = firebase.database().ref(`Users/${userType}/${userUID}/transactions`);
  let listOfTransaction = [];
  const transactions =
  yield call([ref.orderByChild(`orderByDate`).limitToFirst(10), ref.once], 'value');

  if (transactions.val() === null) {
    throw new Error('No Transactions Found');
  }

  Object.keys(transactions.val())
    .map(transactionUID => {
        listOfTransaction.push({
          transactionUID,
          trxCode: transactions.val()[transactionUID].trxCode,
          vendorUID: transactions.val()[transactionUID].vendorUID,
          customerUID: transactions.val()[transactionUID].customerUID,
          customerName: transactions.val()[transactionUID].customerName,
          price: transactions.val()[transactionUID].price,
          timeslots: transactions.val()[transactionUID].timeslots,
          confirmedTime: transactions.val()[transactionUID].confirmedTime,
          orderByDate: transactions.val()[transactionUID].orderByDate,
          status: transactions.val()[transactionUID].status,
          createdDate: transactions.val()[transactionUID].createdDate,
        });
    });
    listOfTransaction.sort((a, b) => a.orderByDate - b.orderByDate);
    return listOfTransaction;
}

export function* getAppendedTransactionList(userType, userUID, previousConfirmDate) {
  const ref = firebase.database().ref(`Users/${userType}/${userUID}/transactions`);
  let listOfTransaction = [];
  const transactions =
  yield call([ref.orderByChild(`orderByDate`).startAt(-previousConfirmDate).limitToFirst(10), ref.once], 'value');

  if (transactions.val() === null) {
    throw new Error('No Transactions Found');
  }

  Object.keys(transactions.val())
    .map(transactionUID => {
        listOfTransaction.push({
          transactionUID,
          trxCode: transactions.val()[transactionUID].trxCode,
          vendorUID: transactions.val()[transactionUID].vendorUID,
          customerUID: transactions.val()[transactionUID].customerUID,
          customerName: transactions.val()[transactionUID].customerName,
          price: transactions.val()[transactionUID].price,
          timeslots: transactions.val()[transactionUID].timeslots,
          confirmedTime: transactions.val()[transactionUID].confirmedTime,
          orderByDate: transactions.val()[transactionUID].orderByDate,
          status: transactions.val()[transactionUID].status,
          createdDate: transactions.val()[transactionUID].createdDate,
        });
    });
    listOfTransaction.sort((a, b) => a.orderByDate - b.orderByDate);
    return listOfTransaction;
}
