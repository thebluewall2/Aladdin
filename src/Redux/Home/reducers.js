const INITIAL_STATE = {
  search: {},
  loading: false,
  vendorList: [],
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
    vendorList: [],
  };
};

const getVendorListSuccess = (state = INITIAL_STATE, action) => {
  return { ...state,
    loading: false,
    errorMsg: '',
    vendorList: action.vendorList,
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
    errorMessage: ''
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
    errorMessage: action.error
  };
};

//Get Vendor Data Section
const getVendorDataAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMessage: ''
    };
};

const getVendorDataSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    vendorData: action.vendorData
  };
};

const getVendorDataFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

//Create or Update Transaction Section
const createOrUpdateTransactionAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMessage: ''
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
};
