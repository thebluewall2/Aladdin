import Types from './types';

const homeSetIsOnline = (isOnline) => ({
  type: Types.HOME_SET_IS_ONLINE,
  isOnline
});

const homeSetSearchCategory = (category) => ({
  type: Types.HOME_SET_SEARCH_CATEGORY,
  category
});

const homeSetSearchSubcategory = (subcategory) => ({
  type: Types.HOME_SET_SEARCH_SUBCATEGORY,
  subcategory
});

const homeSetSearchAddress = (address) => ({
  type: Types.HOME_SET_SEARCH_ADDRESS,
  address
});

const homeGetCoordinatesAttempt = (address) => ({
  type: Types.HOME_GET_COORDINATES_ATTEMPT,
  address
});

const homeGetCoordinatesSuccess = () => ({
  type: Types.HOME_GET_COORDINATES_SUCCESS
});

const homeGetCoordinatesFailure = (errorMsg) => ({
  type: Types.HOME_GET_COORDINATES_FAILURE,
  errorMsg,
})

const homeGetVendorListAttempt = (category, subcategory, userAddress) => ({
  type: Types.HOME_GET_VENDOR_LIST_ATTEMPT,
  category,
  subcategory,
  userAddress
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
const homeGetVendorDataAttempt = (vendorID) => ({
  type: Types.HOME_GET_VENDOR_DATA_ATTEMPT,
  vendorID,
});

const homeGetVendorDataSuccess = (vendorData) => ({
  type: Types.HOME_GET_VENDOR_DATA_SUCCESS,
  vendorData
});

const homeGetVendorDataFailure = (error) => ({
  type: Types.HOME_GET_VENDOR_DATA_FAILURE,
  error
});

const homeUserCreateBookingAttempt = (serviceBooking) => ({
  type: Types.HOME_USER_CREATE_BOOKING_ATTEMPT,
  serviceBooking,
});

const homeUserCreateBookingSuccess = () => ({
  type: Types.HOME_USER_CREATE_BOOKING_SUCCESS,
});

const homeUserCreateBookingFailure = (error) => ({
  type: Types.HOME_USER_CREATE_BOOKING_FAILURE,
  error
});

//Create or Update Transaction Section
const homeCreateOrUpdateTransactionAttempt = (serviceBooking) => ({
  type: Types.HOME_CREATE_OR_UPDATE_TRANSACTION_ATTEMPT,
  serviceBooking,
});

const homeCreateOrUpdateTransactionSuccess = () => ({
  type: Types.HOME_CREATE_OR_UPDATE_TRANSACTION_SUCCESS,
});

const homeCreateOrUpdateTransactionFailure = (error) => ({
  type: Types.HOME_CREATE_OR_UPDATE_TRANSACTION_FAILURE,
  error
});

export default {
  homeSetIsOnline,

  homeSetSearchCategory,
  homeSetSearchSubcategory,
  homeSetSearchAddress,

  homeGetCoordinatesAttempt,
  homeGetCoordinatesSuccess,
  homeGetCoordinatesFailure,

  homeGetVendorListAttempt,
  homeGetVendorListSuccess,
  homeGetVendorListFailure,

  homeGetAllServicesAttempt,
  homeGetAllServicesSuccess,
  homeGetAllServicesFailure,

  homeGetVendorDataAttempt,
  homeGetVendorDataSuccess,
  homeGetVendorDataFailure,

  homeUserCreateBookingAttempt,
  homeUserCreateBookingSuccess,
  homeUserCreateBookingFailure,

  homeCreateOrUpdateTransactionAttempt,
  homeCreateOrUpdateTransactionSuccess,
  homeCreateOrUpdateTransactionFailure,
};
