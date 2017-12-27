import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { push, update } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';


export function* watchCreateOrUpdateTransaction() {
  while (true) {
    //trxCode: 1=create, 2=update, 3=confirm, 4=reject
    const { trxCode, trxID, vendorUID, customerUID,
      customerName, price, timeslots, confirmedTime,
      status } = yield take(Types.HOME_CREATE_OR_UPDATE_TRANSACTION_ATTEMPT);

      const transactionInfo = {
                  trxCode,
                  trxID,
                  vendorUID,
                  customerUID,
                  customerName,
                  price,
                  timeslots,
                  confirmedTime,
                  status };
      yield call(handleCreateOrUpdateTransaction, transactionInfo);
    }
}

export function* handleCreateOrUpdateTransaction(transactionInfo) {
  let dateNow = firebase.database.ServerValue.TIMESTAMP;
  try {
      if (transactionInfo.trxCode === 1) {
        yield call(createTransaction, transactionInfo, dateNow);
      } else if (transactionInfo.trxCode >= 2) {
        yield call(updateTransaction, transactionInfo, dateNow);
      } else {
        throw new Error('Action is not valid');
      }
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
