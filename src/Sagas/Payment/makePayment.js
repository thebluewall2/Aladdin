import { take, call, put } from 'redux-saga/effects';
import { getConfig } from '../../Services/config';

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
      PaymentID: 'trxID-1',
      OrderNumber: 'trxID-1',
      PaymentDesc: 'cat + subcat + time + vendor + customer',
      Amount: '100.00',
      CurrencyCode: 'MYR',
      CustIP: '192.168.1.1',
      CustName: 'Ollie',
      CustEmail: 'ollie@gmail.com',
      CustPhone: '0198273645',
    };
      yield call(handleMakePayment, PaymentInfo);
    }
}

export function* handleMakePayment(PaymentInfo) {
  yield call(sendRequestForProcessing, PaymentInfo);
}

export function sendRequestForProcessing(PaymentInfo) {
  const config = getConfig();
  fetch(config.paymentRequestDomain, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      PaymentInfo,
  })

  })
  .then((response) => {
    console.log(response); //success response redux
  })
  .catch((error) => {
        console.error(error); //failed redux
  });
}
