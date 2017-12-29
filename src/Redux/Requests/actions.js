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
const requestsGetTransactionListAttempt = (userUID, userType, previousConfirmDate) => ({
  type: Types.REQ_GET_TRANSACTION_LIST_ATTEMPT,
  userUID,
  userType,
  previousConfirmDate
});

const requestsGetTransactionListSuccess = (transactionList) => ({
  type: Types.REQ_GET_TRANSACTION_LIST_SUCCESS,
  transactionList
});

const requestsGetTransactionListFailure = (error) => ({
  type: Types.REQ_GET_TRANSACTION_LIST_FAILURE,
  error
});

export default {
  requestsGetTransactionDataAttempt,
  requestsGetTransactionDataSuccess,
  requestsGetTransactionDataFailure,

  requestsGetTransactionListAttempt,
  requestsGetTransactionListSuccess,
  requestsGetTransactionListFailure,
};
