const INITIAL_STATE = {
  loading: false,
  errorMessage: '',
  transactionList: [],
  submittingReview: false,
  gettingTransaction: false,
  makingPayment: false,
  completingTransaction: false,
};

//Get Transaction List Section
const getTransactionListAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMessage: ''
    };
};

const getTransactionListSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    transactionList: action.transactionList
  };
};

const getTransactionListFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

const getSingleTransactionAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    gettingTransaction: true
  };
};

const getSingleTransactionSuccess = (state = INITIAL_STATE, action) => {
  const stateTransactions = state.transactionList;
  const { transaction } = action;

  for (let i = 0; i < stateTransactions.length; i++) {
    if (stateTransactions[i].transactionUID === transaction.transactionUID) {
      stateTransactions[i] = transaction;
    }
  }

  return {
    ...state,
    gettingTransaction: false,
    transactionList: stateTransactions
  };
};

const getSingleTransactionFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    gettingTransaction: false,
  };
};

//Get Transaction Data Section
const getTransactionDataAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMessage: ''
    };
};

const getTransactionDataSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    transactionData: action.transactionData
  };
};

const getTransactionDataFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

const getPaymentInfoAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    makingPayment: true,
    errorMessage: '',
  };
};

const getPaymentInfoSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    makingPayment: false,
    paymentInfo: action.paymentInfo
  };
};

const getPaymentInfoFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    makePayment: false,
    errorMessage: action.error,
  };
};

const makePaymentAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  };
};

const makePaymentSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: false,
  };
};

const makePaymentFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error,
  };
};

const createReviewAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    submittingReview: true,
    errorMessage: '',
  };
};

const createReviewSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    submittingReview: false,
  };
};

const createReviewFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    submittingReview: false,
  };
};

const scanQrCodeAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    completingTransaction: true
  };
};

const scanQrCodeSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    completingTransaction: false,
  };
};

const scanQrCodeFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    completingTransaction: false,
  };
};

const clearError = (state = INITIAL_STATE) => {
  return {
    ...state,
    errorMessage: '',
  };
};

export default {
  INITIAL_STATE,

  getTransactionListAttempt,
  getTransactionListSuccess,
  getTransactionListFailure,

  getSingleTransactionAttempt,
  getSingleTransactionSuccess,
  getSingleTransactionFailure,

  getTransactionDataAttempt,
  getTransactionDataSuccess,
  getTransactionDataFailure,

  getPaymentInfoAttempt,
  getPaymentInfoSuccess,
  getPaymentInfoFailure,

  makePaymentAttempt,
  makePaymentSuccess,
  makePaymentFailure,

  createReviewAttempt,
  createReviewSuccess,
  createReviewFailure,

  scanQrCodeAttempt,
  scanQrCodeSuccess,
  scanQrCodeFailure,

  clearError,
};
