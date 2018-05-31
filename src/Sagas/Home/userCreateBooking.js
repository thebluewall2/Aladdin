import { take, call, put } from 'redux-saga/effects';

import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { update } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

import { showToast, showErrorToast } from '../../Services/helpers';

export function* watchUserCreateBooking(api) {
  while (true) {
    const { serviceBooking } = yield take(Types.HOME_USER_CREATE_BOOKING_ATTEMPT);
    yield call(handleCreateBooking, api, serviceBooking);
  }
}

export function* handleCreateBooking(api, serviceBooking) {
  const transactionUID = yield call(updateFirebaseDb, serviceBooking);

  if (transactionUID) {
    yield call(sendNotifications, api, serviceBooking, transactionUID);

    Actions.pop({ popNum: 5 });
    showToast('Booking requested!');
  } else {
    showErrorToast("Booking failed. Please try again");
  }
}

export function* updateFirebaseDb(serviceBooking) {
  const {
    vendorUID,
    vendorName,
    customerUID,
    customerName,
    selectedAddress,
    selectedCategory,
    selectedSubcategory,
    timeslots,
  } = serviceBooking;

  const dataToInsert = {
    trxCode: 1, //1 for create new trx
    trxID: null, //null means new trx
    vendorUID,
    vendorName,
    customerUID,
    customerName,
    selectedAddress,
    selectedCategory,
    selectedSubcategory,
    price: 0,
    timeslots,
    confirmedTime: null, //no confirmed time yet
    status: 'Pending',
    createdDate: firebase.database.ServerValue.TIMESTAMP,
  };

  const ref = firebase.database().ref(`Transactions/`);
  const transactionUID = yield call(createTransaction, ref, dataToInsert);

  //store transaction reference in customer
  yield call(update, `Users/customer/${dataToInsert.customerUID}/`, 'transactions',
  { [`${transactionUID}`]: dataToInsert.createdDate });

  //store transaction reference in vendor
  yield call(update, `Users/vendor/${dataToInsert.vendorUID}/`, 'transactions',
  { [`${transactionUID}`]: dataToInsert.createdDate });

  return transactionUID;
}

export function createTransaction(ref, serviceBooking) {
  const customerTransactionRef = ref.push();
  customerTransactionRef.set({
    ...serviceBooking,
  });
  return customerTransactionRef.key;
}

export function* sendNotifications(api, serviceBooking, transactionUID) {
  const { vendorUID, customerName } = serviceBooking;

  try {
    //user is creating booking, so sender is customer and recipient is vendor
    const notificationData = {
      transactionUID,
      senderName: customerName,
      recipientUserType: 'vendor',
      recipientUID: vendorUID
    };
    console.log(notificationData);
    const response = yield call(api.sendNotifications, notificationData);

    if (response.ok) {
      yield put(ReduxActions.homeUserCreateBookingSuccess());
    } else {
      console.log(response);
      showErrorToast("Booking failed. Please try again");

      yield put(ReduxActions.homeUserCreateBookingFailure());
    }
  } catch (error) {
    //notifications not sent
    console.log(error);
    showErrorToast("Booking failed. Please try again");

    yield put(ReduxActions.homeUserCreateBookingFailure());
  }
}
