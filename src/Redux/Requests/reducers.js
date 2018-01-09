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

export default {
  INITIAL_STATE,

  getTransactionListAttempt,
  getTransactionListSuccess,
  getTransactionListFailure,

  getTransactionDataAttempt,
  getTransactionDataSuccess,
  getTransactionDataFailure,
};
