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
    const dateNow = firebase.database.ServerValue.TIMESTAMP;
    serviceBooking.createdDate = dateNow;
    serviceBooking.orderByDate = -dateNow;
    yield call(handleCreateOrUpdateTransaction, serviceBooking);
  }
}

export function* handleCreateOrUpdateTransaction(serviceBooking) {
  try {
    switch (serviceBooking.trxCode) {
      case 1:
        yield call(handleCreateTransaction, serviceBooking);
        break;
      case 2:
        yield call(updateTransaction, serviceBooking);
        break;
      default:
        throw new Error('Action is not valid');
    }

    yield put(ReduxActions.homeCreateOrUpdateTransactionSuccess());
  } catch (error) {
    yield put(ReduxActions.homeCreateOrUpdateTransactionFailure(error));
  }
}

export function* handleCreateTransaction(serviceBooking) {
  //store in transactions
  const ref = firebase.database().ref(`Transactions/`);
  const transactionUID = yield call(createTransaction, ref, serviceBooking);

  //store transaction reference in customer
  yield call(update, `Users/customer/${serviceBooking.customerUID}/`, 'transactions',
  { [`${transactionUID}`]: serviceBooking.createdDate });

  //store transaction reference in vendor
  yield call(update, `Users/vendor/${serviceBooking.vendorUID}/`, 'transactions',
  { [`${transactionUID}`]: serviceBooking.createdDate });

  showToast('Booking requested!');
}

export function createTransaction(ref, serviceBooking) {
  const customerTransactionRef = ref.push();
  customerTransactionRef.set({
    ...serviceBooking,
  });
  return customerTransactionRef.key;
}

export function* updateTransaction(serviceBooking) {
  yield call(update, `Transactions/`,
    `${serviceBooking.transactionUID}`, {
      ...serviceBooking,
    });

    showToast("Status updated!");
    Actions.requests();
    // Actions.pop({ popNum: 2, refresh: {} });
}
