const INITIAL_STATE = {
  loading: false,
  errorMessage: '',
  transactionData: '',
  transactionList: [],
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

const makePaymentAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: ''
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
    errorMessage: action.errorMsg
  };
};

const createReviewAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  };
};

const createReviewSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: false,
  };
};

const createReviewFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMsg: action.error
  };
};

export default {
  INITIAL_STATE,

  getTransactionListAttempt,
  getTransactionListSuccess,
  getTransactionListFailure,

  getTransactionDataAttempt,
  getTransactionDataSuccess,
  getTransactionDataFailure,

  makePaymentAttempt,
  makePaymentSuccess,
  makePaymentFailure,

  createReviewAttempt,
  createReviewSuccess,
  createReviewFailure,
};
