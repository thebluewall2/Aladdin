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

export function* handleCreateOrUpdateTransaction(serviceBooking) {
  const dateNow = firebase.database.ServerValue.TIMESTAMP;

  try {
    switch (serviceBooking.trxCode) {
      case 1:
        yield call(createTransaction, serviceBooking, dateNow);
        break;
      case 2:
      case 3:
      case 4:
        yield call(updateTransaction, serviceBooking, dateNow);
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

export function* createTransaction(serviceBooking, dateNow) {
  //store customer
  yield call(push, `Users/customer/${serviceBooking.customerUID}/transactions/`, () => ({
    trxCode: serviceBooking.trxCode,
    vendorUID: serviceBooking.vendorUID,
    customerUID: serviceBooking.customerUID,
    vendorName: serviceBooking.vendorName,
    customerName: serviceBooking.customerName,
    selectedAddress: serviceBooking.selectedAddress,
    selectedCategory: serviceBooking.selectedCategory,
    selectedSubcategory: serviceBooking.selectedSubcategory,
    price: serviceBooking.price,
    timeslots: serviceBooking.timeslots,
    confirmedTime: serviceBooking.confirmedTime,
    orderByDate: -serviceBooking.confirmedTime,
    status: serviceBooking.status,
    createdDate: dateNow,
  })
  );
  //store vendor
  yield call(push, `Users/vendor/${serviceBooking.vendorUID}/transactions/`, () => ({
    trxCode: serviceBooking.trxCode,
    vendorUID: serviceBooking.vendorUID,
    customerUID: serviceBooking.customerUID,
    vendorName: serviceBooking.vendorName,
    customerName: serviceBooking.customerName,
    selectedAddress: serviceBooking.selectedAddress,
    selectedCategory: serviceBooking.selectedCategory,
    selectedSubcategory: serviceBooking.selectedSubcategory,
    price: serviceBooking.price,
    timeslots: serviceBooking.timeslots,
    confirmedTime: serviceBooking.confirmedTime,
    orderByDate: -serviceBooking.confirmedTime,
    status: serviceBooking.status,
    createdDate: dateNow,
  })
  );
}

export function* updateTransaction(serviceBooking, dateNow) {
  //store cutomer
  yield call(update, `Users/customer/${serviceBooking.trxID}/transactions/`,
    `${serviceBooking.trxID}`, {
      trxCode: serviceBooking.trxCode,
      timeslots: serviceBooking.timeslots,
      confirmedTime: serviceBooking.confirmedTime,
      orderByDate: -serviceBooking.confirmedTime,
      status: serviceBooking.status,
      updatedDate: dateNow,
    });

  //store vendor
   yield call(update, `Users/vendor/${serviceBooking.trxID}/transactions/`,
     `${serviceBooking.trxID}`, {
       trxCode: serviceBooking.trxCode,
       timeslots: serviceBooking.timeslots,
       confirmedTime: serviceBooking.confirmedTime,
       orderByDate: -serviceBooking.confirmedTime,
       status: serviceBooking.status,
       updatedDate: dateNow,
      });
}
