import { take, call, put } from 'redux-saga/effects';

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
  const ref = firebase.database().ref(`Users/${userType}/${userUID}/transactions`);

  let transactionList = [];
  const transactions = yield call([ref.orderByChild(`orderByDate`).limitToFirst(45), ref.once], 'value');

  if (transactions.val() === null) {
    return null;
  }

  Object.keys(transactions.val())
    .map(transactionUID => {
        transactionList.push({
          transactionUID,
          trxCode: transactions.val()[transactionUID].trxCode,
          vendorUID: transactions.val()[transactionUID].vendorUID,
          customerUID: transactions.val()[transactionUID].customerUID,
          vendorName: transactions.val()[transactionUID].vendorName,
          customerName: transactions.val()[transactionUID].customerName,
          selectedAddress: transactions.val()[transactionUID].selectedAddress,
          selectedCategory: transactions.val()[transactionUID].selectedCategory,
          selectedSubcategory: transactions.val()[transactionUID].selectedSubcategory,
          price: transactions.val()[transactionUID].price,
          timeslots: transactions.val()[transactionUID].timeslots,
          confirmedTime: transactions.val()[transactionUID].confirmedTime,
          orderByDate: transactions.val()[transactionUID].orderByDate,
          status: transactions.val()[transactionUID].status,
          createdDate: transactions.val()[transactionUID].createdDate,
        });
    });

    transactionList.sort((a, b) => a.orderByDate - b.orderByDate);
    return transactionList;
}

// export function* getAppendedTransactionList(userType, userUID, previousConfirmDate) {
//   const ref = firebase.database().ref(`Users/${userType}/${userUID}/transactions`);
//   let transactionList = [];
//   const transactions =
//   yield call([ref.orderByChild(`orderByDate`).startAt(-previousConfirmDate).limitToFirst(10), ref.once], 'value');
//
//   if (transactions.val() === null) {
//     throw new Error('No Transactions Found');
//   }
//
//   Object.keys(transactions.val())
//     .map(transactionUID => {
//         transactionList.push({
//           transactionUID,
//           trxCode: transactions.val()[transactionUID].trxCode,
//           vendorUID: transactions.val()[transactionUID].vendorUID,
//           customerUID: transactions.val()[transactionUID].customerUID,
//           vendorName: transactions.val()[transactionUID].vendorName,
//           customerName: transactions.val()[transactionUID].customerName,
//           selectedAddress: transactions.val()[transactionUID].selectedAddress,
//           selectedCategory: transactions.val()[transactionUID].selectedCategory,
//           selectedSubcategory: transactions.val()[transactionUID].selectedSubcategory,
//           price: transactions.val()[transactionUID].price,
//           timeslots: transactions.val()[transactionUID].timeslots,
//           confirmedTime: transactions.val()[transactionUID].confirmedTime,
//           orderByDate: transactions.val()[transactionUID].orderByDate,
//           status: transactions.val()[transactionUID].status,
//           createdDate: transactions.val()[transactionUID].createdDate,
//         });
//     });
//     transactionList.sort((a, b) => a.orderByDate - b.orderByDate);
//     return transactionList;
// }
