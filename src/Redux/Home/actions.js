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
const homeGetVendorListSuccess = (vendors) => ({
  type: Types.HOME_GET_ALL_SERVICES_SUCCESS,
  vendors
});
const homeGetVendorListFailure = (error) => ({
  type: Types.HOME_GET_ALL_SERVICES_FAILURE,
  error
});

//Get All Services Section
const homeGetAllServicesAttempt = () => ({
  type: Types.HOME_GET_ALL_SERVICES_ATTEMPT,
});

const homeGetAllServicesSuccess = (services) => ({
  type: Types.HOME_GET_ALL_SERVICES_SUCCESS,
  services
});

const homeGetAllServicesFailure = (error) => ({
  type: Types.HOME_GET_ALL_SERVICES_FAILURE,
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
  homeGetAllServicesFailure

};
