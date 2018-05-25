import { take, call, put } from 'redux-saga/effects';

import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

import { showToast } from '../../Services/helpers';

export function* watchUserCreateBooking(api) {
  while (true) {
    const { serviceBooking } = yield take(Types.HOME_USER_CREATE_BOOKING_ATTEMPT);
    yield call(handleCreateBooking, api, serviceBooking);
  }
}

export function* handleCreateBooking(api, serviceBooking) {
  yield call(updateFirebaseDb, serviceBooking);
  yield call(sendNotifications, api, serviceBooking);

  Actions.pop({ popNum: 5 });
  showToast('Booking requested!');
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
    status: 'Pending'
  };

  yield put(ReduxActions.homeCreateOrUpdateTransactionAttempt(dataToInsert));
}

export function* sendNotifications(api, serviceBooking) {
  const { trxID, vendorUID, vendorName, customerName } = serviceBooking;

  try {
    //user is creating booking, so sender is customer and recipient is vendor
    const notificationData = {
      transactionUID: trxID,
      senderName: customerName,
      recipientName: vendorName,
      recipientUID: vendorUID
    };

    const response = yield call(api.sendNotifications, notificationData);

    if (response.ok) {
      yield put(ReduxActions.userCreateBookingSuccess());
    } else {
      console.log("fail");
    }
  } catch (error) {
    //notifications not sent
    console.log(error);
  }
}
