import Types from './types';

const homeSetSearchCategory = (category) => ({
  type: Types.HOME_SET_SEARCH_CATEGORY,
  category
});

const homeSetSearchSubcategory = (subcategory) => ({
  type: Types.HOME_SET_SEARCH_SUBCATEGORY,
  subcategory
});

const homeGetVendorListAttempt = (category, subcategory) => ({
  type: Types.HOME_GET_VENDOR_LIST_ATTEMPT,
  category,
  subcategory
});

export default {
  homeSetSearchCategory,
  homeSetSearchSubcategory,
  homeGetVendorListAttempt,
};
