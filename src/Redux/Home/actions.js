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

const homeGetVendorListSuccess = (vendorList) => ({
  type: Types.HOME_GET_VENDOR_LIST_SUCCESS,
  vendorList
});

const homeGetVendorListFailure = (errorMsg) => ({
  type: Types.HOME_GET_VENDOR_LIST_FAILURE,
  errorMsg,
});

//Get All Services Section
const homeGetAllServicesAttempt = () => ({
  type: Types.HOME_GET_ALL_SERVICES_ATTEMPT,
});

const homeGetAllServicesSuccess = (services) => ({
  type: Types.HOME_GET_ALL_SERVICES_SUCCESS,
  services
});

const homeGetAllServicesFail = (error) => ({
  type: Types.HOME_GET_ALL_SERVICES_FAIL,
  error
});


export default {
  homeSetSearchCategory,
  homeSetSearchSubcategory,

  homeGetVendorListAttempt,
  homeGetVendorListSuccess,
  homeGetVendorListFailure,

  homeGetAllServicesAttempt,
  homeGetAllServicesSuccess,
  homeGetAllServicesFail

};
