import Types from './types';

//Get Transaction Data Section
const requestsGetTransactionDataAttempt = () => ({
  type: Types.REQ_GET_TRANSACTION_DATA_ATTEMPT,
});

const requestsGetTransactionDataSuccess = (transactionData) => ({
  type: Types.REQ_GET_TRANSACTION_DATA_SUCCESS,
  transactionData
});

const requestsGetTransactionDataFailure = (error) => ({
  type: Types.REQ_GET_TRANSACTION_DATA_FAILURE,
  error
});


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

const requestsCreateReviewAttempt = (reviewInfo, stars) => ({
  type: Types.REQ_CREATE_REVIEW_ATTEMPT,
  reviewInfo,
  stars
});

const requestsCreateReviewSuccess = () => ({
  type: Types.REQ_CREATE_REVIEW_SUCCESS
});

const requestsCreateReviewFailure = (error) => ({
  type: Types.REQ_CREATE_REVIEW_FAILURE,
  error,
});

export default {
  requestsGetTransactionDataAttempt,
  requestsGetTransactionDataSuccess,
  requestsGetTransactionDataFailure,

  requestsGetTransactionListAttempt,
  requestsGetTransactionListSuccess,
  requestsGetTransactionListFailure,

  requestsMakePaymentAttempt,
  requestsMakePaymentSuccess,
  requestsMakePaymentFailure,

  requestsCreateReviewAttempt,
  requestsCreateReviewSuccess,
  requestsCreateReviewFailure,
};
