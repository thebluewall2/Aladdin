import Types from './types';

//Get Transaction List Section
const requestsGetTransactionListAttempt = (userType, userUID) => ({
  type: Types.REQ_GET_TRANSACTION_LIST_ATTEMPT,
  userType,
  userUID,
});

const requestsGetTransactionListSuccess = (transactionList) => ({
  type: Types.REQ_GET_TRANSACTION_LIST_SUCCESS,
  transactionList
});

const requestsGetTransactionListFailure = (error) => ({
  type: Types.REQ_GET_TRANSACTION_LIST_FAILURE,
  error
});

const requestsGetPaymentConfirmationAttempt = (paymentInfo) => ({
  type: Types.REQ_GET_PAYMENT_CONFIRMATION_ATTEMPT,
  paymentInfo
});

const requestsGetPaymentConfirmationSuccess = (paymentInfo) => ({
  type: Types.REQ_GET_PAYMENT_CONFIRMATION_SUCCESS,
  paymentInfo
});

const requestsGetPaymentConfirmationFailure = (error) => ({
  type: Types.REQ_GET_PAYMENT_CONFIRMATION_FAILURE,
  error
});


const requestsMakePaymentAttempt = (paymentInfo) => ({
  type: Types.REQ_MAKE_PAYMENT_ATTEMPT,
  paymentInfo
});

const requestsMakePaymentSuccess = () => ({
  type: Types.REQ_MAKE_PAYMENT_SUCCESS,
});

const requestsMakePaymentFailure = (error) => ({
  type: Types.REQ_MAKE_PAYMENT_FAILURE,
  error
});

const requestsCreateReviewAttempt = (vendorUID, review) => ({
  type: Types.REQ_CREATE_REVIEW_ATTEMPT,
  vendorUID,
  review
});

const requestsCreateReviewSuccess = () => ({
  type: Types.REQ_CREATE_REVIEW_SUCCESS
});

const requestsCreateReviewFailure = (error) => ({
  type: Types.REQ_CREATE_REVIEW_FAILURE,
  error,
});

const requestsVendorSelectTimeAttempt = (serviceBooking) => ({
  type: Types.REQ_VENDOR_SELECT_TIME_ATTEMPT,
  serviceBooking
});

const requestsVendorSelectTimeSuccess = () => ({
  type: Types.REQ_VENDOR_SELECT_TIME_SUCCESS,
});

const requestsVendorSelectTimeFailure = (error) => ({
  type: Types.REQ_VENDOR_SELECT_TIME_FAILURE,
  error
});

const requestsClearErrorMessage = () => ({
  type: Types.REQ_CLEAR_ERROR,
});

export default {
  requestsGetTransactionListAttempt,
  requestsGetTransactionListSuccess,
  requestsGetTransactionListFailure,

  requestsGetPaymentConfirmationAttempt,
  requestsGetPaymentConfirmationSuccess,
  requestsGetPaymentConfirmationFailure,

  requestsMakePaymentAttempt,
  requestsMakePaymentSuccess,
  requestsMakePaymentFailure,

  requestsCreateReviewAttempt,
  requestsCreateReviewSuccess,
  requestsCreateReviewFailure,

  requestsVendorSelectTimeAttempt,
  requestsVendorSelectTimeSuccess,
  requestsVendorSelectTimeFailure,

  requestsClearErrorMessage,
};
