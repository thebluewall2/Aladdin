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

const homeGetAllServicesFailure = (error) => ({
  type: Types.HOME_GET_ALL_SERVICES_FAILURE,
  error
});

//Get Vendor Data Section
const homeGetVendorDataAttempt = () => ({
  type: Types.HOME_GET_VENDOR_DATA_ATTEMPT,
});

const homeGetVendorDataSuccess = (vendorData) => ({
  type: Types.HOME_GET_VENDOR_DATA_SUCCESS,
  vendorData
});

const homeGetVendorDataFailure = (error) => ({
  type: Types.HOME_GET_VENDOR_DATA_FAILURE,
  error
});

//Create or Update Transaction Section
const homeCreateOrUpdateTransactionAttempt = (trxCode, trxID, vendorUID, customerUID,
  customerName, price, timeslots, confirmedTime,
  status) => ({
  type: Types.HOME_CREATE_OR_UPDATE_TRANSACTION_ATTEMPT,
  trxCode,
  trxID,
  vendorUID,
  customerUID,
  customerName,
  price,
  timeslots,
  confirmedTime,
  status,
});

const homeCreateOrUpdateTransactionSuccess = (vendorData) => ({
  type: Types.HOME_CREATE_OR_UPDATE_TRANSACTION_SUCCESS,
  vendorData
});

const homeCreateOrUpdateTransactionFailure = (error) => ({
  type: Types.HOME_CREATE_OR_UPDATE_TRANSACTION_FAILURE,
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
  homeGetAllServicesFailure,

  homeGetVendorDataAttempt,
  homeGetVendorDataSuccess,
  homeGetVendorDataFailure,

  homeCreateOrUpdateTransactionAttempt,
  homeCreateOrUpdateTransactionSuccess,
  homeCreateOrUpdateTransactionFailure,

};
