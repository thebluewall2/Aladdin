import { take, call, put } from 'redux-saga/effects';

import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import Config from '../../Services/config';
import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';

export function* watchGetPaymentInfo() {
  while (true) {
    // TransactonType, PymtMethod, ServiceID, PaymentID, OrderNumber, PaymentDesc
    // MerchantReturnURL(for return to the page), Amount, CurrencyCode, HashValue, CustIP, CustName, CustEmail
    // CustPhone, MerchantName, MerchantCallbackURL(for confirm api request to firebase api)
    const { paymentInfo } = yield take(Types.REQ_GET_PAYMENT_CONFIRMATION_ATTEMPT);
    const userIP = yield call(getIP);

    const paymentToMake = {
      TransactionType: 'SALE',
      PymtMethod: 'ANY',
      OrderNumber: paymentInfo.transactionUID,
      PaymentDesc: `E-Reno payment: ${paymentInfo.selectedSubcategory} by ${paymentInfo.vendorName}`,
      Amount: '1.00',
      CurrencyCode: 'MYR',
      vendorUID: paymentInfo.vendorUID,
      customerUID: paymentInfo.customerUID,
      CustIP: userIP,
      CustName: paymentInfo.customerName,
      CustEmail: paymentInfo.userEmail,
      CustPhone: paymentInfo.userPhone,
      PaymentID: firebase.database().ref(`Payments/`).push().key,
      ServiceID: '',
    };

    const paymentDetails = yield call(sendRequestForProcessing, paymentToMake);

    if (paymentDetails) {
      yield put(ReduxActions.requestsGetPaymentConfirmationSuccess(paymentDetails));
      Actions.makePayment();
    } else {
      const errorMsg = "Payment failed. Please try again";
      yield put(ReduxActions.requestsGetPaymentConfirmationFailure(errorMsg));
    }
  }
}

async function getIP() {
  const response = await fetch(Config.ipifyLink);
  return response._bodyText;
}

async function sendRequestForProcessing(paymentInfoWithID) {
  const endpoint = Config.getFullParametersDomain;

  let paymentDetails;

  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paymentInfoWithID,
    })
  })
  .then(response => {
    if (response.ok) {
      paymentDetails = JSON.parse(response._bodyText);
    } else {
      console.log(response);
    }
  })
  .catch((error) => {
    console.log(error);
  });

  return paymentDetails;
}
