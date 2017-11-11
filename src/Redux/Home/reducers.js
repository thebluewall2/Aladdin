const INITIAL_STATE = {
  search: {}
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


export default {
  INITIAL_STATE,

  setSearchCategory,
  setSearchSubcategory,
};
