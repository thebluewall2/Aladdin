const INITIAL_STATE = {
  isOnline: true,
  search: {},
  loading: false,
  errorMsg: '',
};

const setIsOnline = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isOnline: action.isOnline,
  };
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

const getCoordinatesAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMsg: '',
  };
};

const getCoordinatesSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: false,
  };
};

const getCoordinatesFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMsg: action.errorMsg
  };
};

//Get Vendor List Section
const getVendorListAttempt = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMsg: '',
    search: {
      ...state.search,
      vendorList: [],
    }
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

const userCreateBookingAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMsg: '',
  };
};

const userCreateBookingSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: false
  };
};

const userCreateBookingFailure = (state = INITIAL_STATE, action) => {
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


export default {
  INITIAL_STATE,

  setIsOnline,

  setSearchCategory,
  setSearchSubcategory,
  setSearchAddress,

  getCoordinatesAttempt,
  getCoordinatesSuccess,
  getCoordinatesFailure,

  getVendorListAttempt,
  getVendorListSuccess,
  getVendorListFailure,

  getAllServicesAttempt,
  getAllServicesSuccess,
  getAllServicesFailure,

  getVendorDataAttempt,
  getVendorDataSuccess,
  getVendorDataFailure,

  userCreateBookingAttempt,
  userCreateBookingSuccess,
  userCreateBookingFailure,

  createOrUpdateTransactionAttempt,
  createOrUpdateTransactionSuccess,
  createOrUpdateTransactionFailure,
};
