import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { push, update } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

import { showToast } from '../../Services/helpers';

export function* watchCreateOrUpdateTransaction() {
  while (true) {
    //trxCode: 1=create, 2=update, 3=confirm, 4=reject
    const { serviceBooking } = yield take(Types.HOME_CREATE_OR_UPDATE_TRANSACTION_ATTEMPT);
    yield call(handleCreateOrUpdateTransaction, serviceBooking);
  }
}

export function* handleCreateOrUpdateTransaction(transactionInfo) {
  const dateNow = firebase.database.ServerValue.TIMESTAMP;

  try {
    switch (transactionInfo.trxCode) {
      case 1:
        yield call(createTransaction, transactionInfo, dateNow);
        break;
      case 2:
      case 3:
      case 4:
        yield call(updateTransaction, transactionInfo, dateNow);
        break;
      default:
        throw new Error('Action is not valid');
    }

    showToast('Booking requested!');
    yield put(ReduxActions.homeCreateOrUpdateTransactionSuccess());
  } catch (error) {
    yield put(ReduxActions.homeCreateOrUpdateTransactionFailure(error));
  }
}

export function* createTransaction(transactionInfo, dateNow) {
  //store customer
  yield call(push, `Users/customer/${transactionInfo.customerUID}/transactions/`, () => ({
    trxCode: transactionInfo.trxCode,
    vendorUID: transactionInfo.vendorUID,
    customerUID: transactionInfo.customerUID,
    customerName: transactionInfo.customerName,
    price: transactionInfo.price,
    timeslots: transactionInfo.timeslots,
    confirmedTime: transactionInfo.confirmedTime,
    orderByDate: -transactionInfo.confirmedTime,
    status: transactionInfo.status,
    createdDate: dateNow,
  })
  );
  //store vendor
  yield call(push, `Users/vendor/${transactionInfo.vendorUID}/transactions/`, () => ({
    trxCode: transactionInfo.trxCode,
    vendorUID: transactionInfo.vendorUID,
    customerUID: transactionInfo.customerUID,
    customerName: transactionInfo.customerName,
    price: transactionInfo.price,
    timeslots: transactionInfo.timeslots,
    confirmedTime: transactionInfo.confirmedTime,
    orderByDate: -transactionInfo.confirmedTime,
    status: transactionInfo.status,
    createdDate: dateNow,
  })
  );
}

export function* updateTransaction(transactionInfo, dateNow) {
  //store cutomer
  yield call(update, `Users/customer/${transactionInfo.trxID}/transactions/`,
    `${transactionInfo.trxID}`, {
      trxCode: transactionInfo.trxCode,
      timeslots: transactionInfo.timeslots,
      confirmedTime: transactionInfo.confirmedTime,
      orderByDate: -transactionInfo.confirmedTime,
      status: transactionInfo.status,
      updatedDate: dateNow,
    });

  //store vendor
   yield call(update, `Users/vendor/${transactionInfo.trxID}/transactions/`,
     `${transactionInfo.trxID}`, {
       trxCode: transactionInfo.trxCode,
       timeslots: transactionInfo.timeslots,
       confirmedTime: transactionInfo.confirmedTime,
       orderByDate: -transactionInfo.confirmedTime,
       status: transactionInfo.status,
       updatedDate: dateNow,
      });
}
