import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { create, update } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';


export function* watchMakePayment() {
  while (true) {
    const { paymentInfo } = yield take(Types.REQ_MAKE_PAYMENT_ATTEMPT);

    const editedPaymentInfo = {
      ...paymentInfo,
      ServiceID: null,
      MerchantReturnURL: null,
      HashValue: null,
    };

    yield call(handleMakePayment, editedPaymentInfo);
    }
}

export function* handleMakePayment(paymentInfo) {
  try {
    const dateNow = firebase.database.ServerValue.TIMESTAMP;

    yield call(create, 'Payments', () => ({
        [`Payments/${paymentInfo.PaymentID}`]: {
          ...paymentInfo,
          TxnStatus: 'Pending',
          createdDate: dateNow,
        }
      })
    );
    yield call(createPaymentReference, paymentInfo, dateNow);

    yield put(ReduxActions.requestsMakePaymentSuccess());
  } catch (error) {
    console.log(error);
    const errorMessage = "Payment failed, please try again later.";

    yield put(ReduxActions.requestsMakePaymentFailure(errorMessage));
  }
}

export function* createPaymentReference(paymentInfo, dateNow) {
  //store payment reference in customer
  yield call(update, `Users/customer/${paymentInfo.customerUID}/`, 'payments',
  { [`${paymentInfo.PaymentID}`]: dateNow });
  //store payment reference in vendor
  yield call(update, `Users/vendor/${paymentInfo.vendorUID}/`, 'payments',
  { [`${paymentInfo.PaymentID}`]: dateNow });
}
