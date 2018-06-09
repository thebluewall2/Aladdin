import { take, put, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';

import Types from '../../Redux/Requests/types';
import ReduxActions from '../../Redux/Actions';
import { showToast, showErrorToast } from '../../Services/helpers';

export function* watchCompleteTransactions(api) {
  while (true) {
    const { data } = yield take(Types.REQ_SCAN_QR_CODE_ATTEMPT);
    yield call(handleCompleteTransaction, data, api);
  }
}

export function* handleCompleteTransaction(data, api) {
  const updateSuccess = yield call(updateFirebaseDb, data);
  yield call(sendNotifications, data, api);

  if (updateSuccess) {
    Actions.pop({ popNum: 2 });

    showToast("Transaction complete!");

    yield put(ReduxActions.requestsScanQrCodeSuccess());
  } else {
    showErrorToast("Something went wrong, please try again later");

    yield put(ReduxActions.requestsScanQrCodeFailure());
  }
}

export function* updateFirebaseDb(data) {
  const { transactionUID, customerUID, vendorUID } = data;

  const transactionToUpdate = {
    transactionUID,
    trxCode: 2,
    customerUID,
    vendorUID,
    status: "Completed"
  };

  yield put(ReduxActions.homeCreateOrUpdateTransactionAttempt(transactionToUpdate));

  return true;
}

export function* sendNotifications(data, api) {
  const { customerUID, transactionUID, vendorName } = data;

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
        return true;
    }

    console.log(response);
    return false;
  } catch (error) {
    console.log(error);

    return false;
  }
}
