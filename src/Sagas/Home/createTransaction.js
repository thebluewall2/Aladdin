import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { update } from 'firebase-saga';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

import { showToast } from '../../Services/helpers';

export function* watchCreateOrUpdateTransaction() {
  while (true) {
    //trxCode: 1 = create, 2 = update
    const { serviceBooking } = yield take(Types.HOME_CREATE_OR_UPDATE_TRANSACTION_ATTEMPT);
    yield call(handleCreateOrUpdateTransaction, serviceBooking);
  }
}

export function* handleCreateOrUpdateTransaction(serviceBooking) {
  const dateNow = firebase.database.ServerValue.TIMESTAMP;

  try {
    switch (serviceBooking.trxCode) {
      case 1:
        yield call(handleCreateTransaction, serviceBooking, dateNow);
        break;
      case 2:
        yield call(updateTransaction, serviceBooking, dateNow);
        break;
      default:
        throw new Error('Action is not valid');
    }

    yield put(ReduxActions.homeCreateOrUpdateTransactionSuccess());
  } catch (error) {
    yield put(ReduxActions.homeCreateOrUpdateTransactionFailure(error));
  }
}

export function* handleCreateTransaction(serviceBooking, dateNow) {
  //store in transactions
  const ref = firebase.database().ref(`Transactions/`);
  const transactionUID = yield call(createTransaction, ref, serviceBooking, dateNow);

  //store transaction reference in customer
  yield call(update, `Users/vendor/${serviceBooking.customerUID}/`, 'transactions',
  { [`${transactionUID}`]: dateNow });

  //store transaction reference in vendor
  yield call(update, `Users/vendor/${serviceBooking.vendorUID}/`, 'transactions',
  { [`${transactionUID}`]: dateNow });

  showToast('Booking requested!');
}

export function createTransaction(ref, serviceBooking, dateNow) {
  const customerTransactionRef = ref.push();
  customerTransactionRef.set({
    ...serviceBooking,
    createdDate: dateNow,
  });

  return customerTransactionRef.key;
}

export function* updateTransaction(serviceBooking, dateNow) {
  // store customer
  yield call(update, `Users/customer/${serviceBooking.customerUID}/transactions/`,
    `${serviceBooking.transactionUID}`, {
      ...serviceBooking,
      updatedDate: dateNow
    });

  //store vendor
   yield call(update, `Users/vendor/${serviceBooking.vendorUID}/transactions/`,
     `${serviceBooking.transactionUID}`, {
       ...serviceBooking,
       updatedDate: dateNow
      });

    showToast("Status updated!");

    Actions.requests();

    // Actions.pop({ popNum: 2, refresh: {} });
}
