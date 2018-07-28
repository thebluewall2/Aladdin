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
  const listOfTransactionUID = [];
  const listOfTransactions = [];

  Object.keys(listOfTransactionUIDFromFirebase)
    .map(transactionUID => {
      listOfTransactionUID.push(transactionUID);
    });

  const listOfTransactionFromFirebase = yield call(get, 'Transactions/', '');

  Object.keys(listOfTransactionFromFirebase).map(transactionUID => {
    if (listOfTransactionUID.includes(transactionUID)) {
      listOfTransactions.push({
        ...listOfTransactionFromFirebase[transactionUID],
        transactionUID,
      });
    }
  });

  if (listOfTransactions === null) {
    return [];
  }
  listOfTransactions.sort((a, b) => {
    return b.createdDate - a.createdDate;
  });
  console.log(listOfTransactions);
  return listOfTransactions;
}

//TODO: try to figure out Promises to utilize snapshot

// export function getCustomerTransactions(listOfTransactionUID) {
//   const templistOfTransactions = [];
//   return new Promise(resolve => {
//     const ref = firebase.database().ref();
//     const key = "Transactions";
//     const keyRef = ref.child(key);
//     keyRef.on('value', (snap) => {
//       Object.keys(snap.val()).map(transactionUID => {
//         console.log(listOfTransactionUID.includes(transactionUID));
//         if (listOfTransactionUID.includes(transactionUID)) {
//           templistOfTransactions.push({
//             ...snap.val()[transactionUID],
//             transactionUID,
//           });
//         }
//       });
//       console.log(templistOfTransactions);
//       keyRef.off('value', resolve);
//       resolve(templistOfTransactions);
//     });
//   });
// }
