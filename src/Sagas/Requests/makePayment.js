import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { create, update } from 'firebase-saga';

import Config from '../../Services/config';
import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';


export function* watchMakePayment() {
  while (true) {
    // TransactonType, PymtMethod, ServiceID, PaymentID, OrderNumber, PaymentDesc
    // MerchantReturnURL(for return to the page), Amount, CurrencyCode, HashValue, CustIP, CustName, CustEmail
    // CustPhone, MerchantName, MerchantCallbackURL(for confirm api request to firebase api)
    const { paymentInfo } = yield take(Types.REQ_MAKE_PAYMENT_ATTEMPT);
    //please help filter out
    //1. ServiceID
    //2. MerchantName
    //3. MerchantURLs ***
    //4. HashValue
    yield call(handleMakePayment, paymentInfo);
    }
}

export function* handleMakePayment(paymentInfo) {
  try {
    yield call(create, 'Payments', () => ({
        [`Payments/${paymentInfo.PaymentID}`]: {
          ...paymentInfo,
          TxnStatus: 'Pending',
          createdDate: dateNow,
        }
      })
    );
    yield call(createPaymentReference, paymentInfo, dateNow);
    //success
  } catch (error) {
    //failed
  }
  const dateNow = firebase.database.ServerValue.TIMESTAMP;
}

export function* createPaymentReference(paymentInfo, dateNow) {
  //store payment reference in customer
  yield call(update, `Users/customer/${paymentInfo.customerUID}/`, 'payments',
  { [`${paymentInfo.PaymentID}`]: dateNow });
  //store payment reference in vendor
  yield call(update, `Users/vendor/${paymentInfo.vendorUID}/`, 'payments',
  { [`${paymentInfo.PaymentID}`]: dateNow });
}
