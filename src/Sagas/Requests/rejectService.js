import { put, take, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';

import { showToast } from '../../Services/helpers';

export function* watchRejectService(api) {
  while (true) {
    const { data } = yield take(Types.REQ_REJECT_SERVICE_ATTEMPT);
    yield call(handleRejectService, data, api);
  }
}

export function* handleRejectService(data, api) {
  yield call(updateFirebase, data);
  yield call(sendNotifications, data, api);

  yield put(ReduxActions.requestsRejectServiceSuccess());
  yield put(ReduxActions.requestsGetTransactionListAttempt('vendor', data.vendorUID));
  Actions.pop();
}

export function* updateFirebase(data) {
  const { transactionUID, customerUID, vendorUID } = data;

  const transactionToUpdate = {
    trxCode: 2, //2 is for updating transactions
    transactionUID,
    status: "Rejected",
    customerUID,
    vendorUID,
  };

  yield put(ReduxActions.homeCreateOrUpdateTransactionAttempt(transactionToUpdate));
}

export function* sendNotifications(data, api) {
  const { transactionUID, vendorName, customerUID } = data;

  const notificationToSend = {
      method: 'REVIEW',
      transactionUID,
      senderName: vendorName,
      recipientUserType: 'customer',
      recipientUID: customerUID
  };

  try {
    const response = yield call(api.sendNotifications, notificationToSend);

    if (response.ok) {
      showToast("Transaction rejected!");
    }
  } catch (error) {
    console.log(error);

    yield put(ReduxActions.requestsRejectServiceFailure());
  }
}
