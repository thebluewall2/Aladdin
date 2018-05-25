import { take, put, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';

import { showToast } from '../../Services/helpers';

export function* watchVendorSelectTime(api) {
  while (true) {
    const { serviceBooking } = yield take(Types.REQ_VENDOR_SELECT_TIME_ATTEMPT);
    yield call(handleSelectTime, api, serviceBooking);
  }
}

export function* handleSelectTime(api, serviceBooking) {
  const updateSuccess = yield call(updateFirebaseDb, serviceBooking);
  const notificationsSentSuccess = yield call(sendNotifications, api, serviceBooking);

  if (updateSuccess && notificationsSentSuccess) {
    showToast("Status updated!");
    Actions.requests();
  }
}

export function* updateFirebaseDb(serviceBooking) {
  const { time, transaction } = serviceBooking;

  const dataToInsert = {
    trxCode: 2, //2 is for updating transactions
    transactionUID: transaction.transactionUID,
    confirmedTime: time,
    orderByDate: -time,
    status: "Awaiting payment",
    customerUID: transaction.customerUID,
    vendorUID: transaction.vendorUID
  };

  yield put(ReduxActions.homeCreateOrUpdateTransactionAttempt, dataToInsert);

  return true;
}

export function* sendNotifications(api, serviceBooking) {
  const { transaction } = serviceBooking;
  const { customerUID, transactionUID, vendorName } = transaction;

  //vendor choosing time, vendor is sender
  const data = {
    transactionUID,
    senderName: vendorName,
    recipientUserType: 'customer',
    receipientUID: customerUID
  };

  try {
    const response = yield call(api.sendNotifications, data);

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log(error);

    return false;
  }

  return false;
}
