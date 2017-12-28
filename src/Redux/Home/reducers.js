const INITIAL_STATE = {
  search: {},
  loading: false,
  errorMsg: '',
};

const setSearchCategory = (state = INITIAL_STATE, action) => {
  return { ...state,
    search: {
      ...state.search,
      category: action.category
    }
  };
};

const setSearchSubcategory = (state = INITIAL_STATE, action) => {
  return { ...state,
    search: {
      ...state.search,
      subcategory: action.subcategory
    }
  };
};

const setSearchAddress = (state = INITIAL_STATE, action) => {
  return { ...state,
    search: {
      ...state.search,
      userAddress: action.address
    }
  };
};

//Get Vendor List Section
const getVendorListAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMsg: '',
  };
};

const getVendorListSuccess = (state = INITIAL_STATE, action) => {
  return { ...state,
    loading: false,
    errorMsg: '',
    search: {
      ...state.search,
      vendorList: action.vendorList
    }
  };
};

const getVendorListFailure = (state = INITIAL_STATE, action) => {
  return { ...state,
    loading: false,
    errorMsg: action.errorMsg,
  };
};

//Get All Services Section
const getAllServicesAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMsg: ''
    };
};

const getAllServicesSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    serviceCategories: action.services
  };
};

const getAllServicesFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMsg: action.error
  };
};

//Get Vendor Data Section
const getVendorDataAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMsg: ''
    };
};

const getVendorDataSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    search: {
      ...state.search,
      vendorData: action.vendorData
    }
  };
};

const getVendorDataFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMsg: action.error
  };
};

//Create or Update Transaction Section
const createOrUpdateTransactionAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMsg: ''
    };
};

const createOrUpdateTransactionSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: false
  };
};

const createOrUpdateTransactionFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMsg: action.error
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
    transactionData: action.transactionData
  };
};

const getTransactionListFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};


export default {
  INITIAL_STATE,

  setSearchCategory,
  setSearchSubcategory,
  setSearchAddress,

  getVendorListAttempt,
  getVendorListSuccess,
  getVendorListFailure,

  getAllServicesAttempt,
  getAllServicesSuccess,
  getAllServicesFailure,

  getVendorDataAttempt,
  getVendorDataSuccess,
  getVendorDataFailure,

  createOrUpdateTransactionAttempt,
  createOrUpdateTransactionSuccess,
  createOrUpdateTransactionFailure,

  getTransactionDataAttempt,
  getTransactionDataSuccess,
  getTransactionDataFailure,

  getTransactionListAttempt,
  getTransactionListSuccess,
  getTransactionListFailure,
};
