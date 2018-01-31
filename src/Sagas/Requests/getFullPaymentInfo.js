import { take, call, put } from 'redux-saga/effects';

import uuid from 'uuid-v4'

import Config from '../../Services/config';
import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';


export function* watchMakePayment() {
  while (true) {
    // TransactonType, PymtMethod, ServiceID, PaymentID, OrderNumber, PaymentDesc
    // MerchantReturnURL(for return to the page), Amount, CurrencyCode, HashValue, CustIP, CustName, CustEmail
    // CustPhone, MerchantName, MerchantCallbackURL(for confirm api request to firebase api)
    const { paymentInfo } = yield take(Types.REQ_GET_FULL_PAYMENT_INFO);

    const PaymentInfoWithID = {
      ...paymentInfo,
      PaymentID: uuid(),
    };
    // const paymentToMake = {
    //   TransactonType: 'SALE',
    //   PymtMethod: 'ANY',
    //   OrderNumber: paymentInfo.transactionUID,
    //   PaymentDesc: `E-Reno payment: ${paymentInfo.selectedSubcategory} by ${paymentInfo.vendorName}`,
    //   Amount: '1.00',
    //   CurrencyCode: 'MYR',
    //   vendorUID: paymentInfo.vendorUID, //dont need this one
    //   customerUID: paymentInfo.customerUID, //dont need this one
    //   CustIP: '113.210.205.140',
    //   CustName: paymentInfo.customerName,
    //   CustEmail: paymentInfo.userEmail,
    //   CustPhone: paymentInfo.userPhone,
    // };
    yield call(handleMakePayment, PaymentInfoWithID);
    }
}

export function* handleMakePayment(PaymentInfoWithID) {
  try {
    yield call(sendRequestForProcessing, PaymentInfoWithID);
    //ReduxActions
  } catch (error) {
    //ReduxActions
  }
}

export function sendRequestForProcessing(PaymentInfoWithID) {
  const endpoint = Config.getFullParametersDomain;
  fetch(endpoint, {
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
