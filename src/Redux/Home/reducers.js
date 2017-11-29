const INITIAL_STATE = {
  search: {},
  loading: false,
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

  getAllServicesAttempt,
  getAllServicesSuccess,
  getAllServicesFail
};
