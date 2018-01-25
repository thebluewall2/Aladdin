import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { update } from 'firebase-saga';

import Config from '../../Services/config';
import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';


export function* watchMakePayment() {
  while (true) {
    // TransactonType, PymtMethod, ServiceID, PaymentID, OrderNumber, PaymentDesc
    // MerchantReturnURL(for return to the page), Amount, CurrencyCode, HashValue, CustIP, CustName, CustEmail
    // CustPhone, MerchantName, MerchantCallbackURL(for confirm api request to firebase api)
    let { PaymentInfo } = yield take(Types.PAY_MAKE_PAYMENT);
    PaymentInfo = {
      TransactionType: 'SALE',
      PymtMethod: 'CC',
      ServiceID: 'sit',
      OrderNumber: 'trxID-1',
      PaymentDesc: 'cat + subcat + time + vendor + customer',
      Amount: '100.00',
      CurrencyCode: 'MYR',
      vendorUID: 'vendorUID-2gy78i87',
      customerUID: 'customerUID-890plk8t9',
      CustIP: '192.168.1.1',
      CustName: 'Ollie',
      CustEmail: 'ollie@gmail.com',
      CustPhone: '0198273645',
    };
      yield call(handleMakePayment, PaymentInfo);
    }
}

export function* handleMakePayment(PaymentInfo) {
  const dateNow = firebase.database.ServerValue.TIMESTAMP;
  const ref = firebase.database().ref(`Payments/`);
  const paymentRequest = yield call(createPaymentRecord, ref, PaymentInfo, dateNow);

  yield call(createPaymentReference, PaymentInfo, paymentRequest, dateNow);
  yield call(sendRequestForProcessing, paymentRequest);
}

export function* createPaymentReference(PaymentInfo, paymentRequest, dateNow) {
  //store payment reference in customer
  yield call(update, `Users/customer/${PaymentInfo.customerUID}/`, 'payments',
  { [`${paymentRequest.PaymentID}`]: dateNow });
  //store payment reference in vendor
  yield call(update, `Users/vendor/${PaymentInfo.vendorUID}/`, 'payments',
  { [`${paymentRequest.PaymentID}`]: dateNow });
}

export function createPaymentRecord(ref, PaymentInfo, dateNow) {
  const PaymentInfoRef = ref.push();
  PaymentInfoRef.set({
    ...PaymentInfo,
    TxnStatus: 'Pending',
    createdDate: dateNow,
  });
  //Clean PaymentInfo for request to Payment Gateway
  const paymentRequest = {
      TransactionType: PaymentInfo.TransactionType,
      PymtMethod: PaymentInfo.PymtMethod,
      ServiceID: PaymentInfo.ServiceID,
      OrderNumber: PaymentInfo.OrderNumber,
      PaymentDesc: PaymentInfo.PaymentDesc,
      Amount: PaymentInfo.Amount,
      CurrencyCode: PaymentInfo.CurrencyCode,
      CustIP: PaymentInfo.CustIP,
      CustName: PaymentInfo.CustName,
      CustEmail: PaymentInfo.CustEmail,
      CustPhone: PaymentInfo.CustPhone,
      PaymentID: PaymentInfoRef.key,
  };
  return paymentRequest;
}

export function sendRequestForProcessing(PaymentInfoWithID) {
  const config = Config.paymentRequestDomain;
  fetch(config, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      PaymentInfoWithID,
  })

  })
  .then((response) => {
    console.log(response); //success response redux
  })
  .catch((error) => {
        console.error(error); //failed redux
  });
}
