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

const getAllServicesFail = (state = INITIAL_STATE, action) => {
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

  getVendorListAttempt,
  getVendorListSuccess,
  getVendorListFailure,

  getAllServicesAttempt,
  getAllServicesSuccess,
  getAllServicesFail
};
