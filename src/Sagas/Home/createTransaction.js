import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { push, update } from 'firebase-saga';
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
        yield call(createTransaction, serviceBooking, dateNow);
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

export function* createTransaction(serviceBooking, dateNow) {
  //store customer
  let ref = firebase.database().ref(`Users/customer/${serviceBooking.customerUID}/`);
  const transactionUID = yield call(createTransactionForCustomer, ref, serviceBooking, dateNow);

  //store vendor
  ref = firebase.database().ref(`Users/vendor/${serviceBooking.vendorUID}/transactions/`);
  yield call(createTransactionForVendor, ref, serviceBooking, dateNow, transactionUID);

  showToast('Booking requested!');
}

export function createTransactionForCustomer(ref, serviceBooking, dateNow) {
  const transactionRef = ref.child("transactions");
  const customerTransactionRef = transactionRef.push();
  customerTransactionRef.set({
    ...serviceBooking,
    createdDate: dateNow,
  });

  return customerTransactionRef.key;
}

export function createTransactionForVendor(ref, serviceBooking, dateNow, transactionUID) {
  ref.child(`${transactionUID}`).set({
      ...serviceBooking,
      createdDate: dateNow,
  });
}

export function* updateTransaction(serviceBooking, dateNow) {
  console.log(serviceBooking);
  //store customer
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

    Actions.pop({ popNum: 2 });
}
