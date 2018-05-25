import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.HOME_SET_IS_ONLINE]: Reducers.setIsOnline,

    [Types.HOME_SET_SEARCH_CATEGORY]: Reducers.setSearchCategory,
    [Types.HOME_SET_SEARCH_SUBCATEGORY]: Reducers.setSearchSubcategory,
    [Types.HOME_SET_SEARCH_ADDRESS]: Reducers.setSearchAddress,

    [Types.HOME_GET_COORDINATES_ATTEMPT]: Reducers.getCoordinatesAttempt,
    [Types.HOME_GET_COORDINATES_SUCCESS]: Reducers.getCoordinatesSuccess,
    [Types.HOME_GET_COORDINATES_FAILURE]: Reducers.getCoordinatesFailure,

    [Types.HOME_GET_VENDOR_LIST_ATTEMPT]: Reducers.getVendorListAttempt,
    [Types.HOME_GET_VENDOR_LIST_SUCCESS]: Reducers.getVendorListSuccess,
    [Types.HOME_GET_VENDOR_LIST_FAILURE]: Reducers.getVendorListFailure,

    [Types.HOME_GET_ALL_SERVICES_ATTEMPT]: Reducers.getAllServicesAttempt,
    [Types.HOME_GET_ALL_SERVICES_SUCCESS]: Reducers.getAllServicesSuccess,
    [Types.HOME_GET_ALL_SERVICES_FAILURE]: Reducers.getAllServicesFailure,

    [Types.HOME_GET_VENDOR_DATA_ATTEMPT]: Reducers.getVendorDataAttempt,
    [Types.HOME_GET_VENDOR_DATA_SUCCESS]: Reducers.getVendorDataSuccess,
    [Types.HOME_GET_VENDOR_DATA_FAILURE]: Reducers.getVendorDataFailure,

    [Types.HOME_USER_CREATE_BOOKING_ATTEMPT]: Reducers.userCreateBookingAttempt,
    [Types.HOME_USER_CREATE_BOOKING_SUCCESS]: Reducers.userCreateBookingSuccess,
    [Types.HOME_USER_CREATE_BOOKING_FAILURE]: Reducers.userCreateBookingFailure,

    // [Types.HOME_CREATE_OR_UPDATE_TRANSACTION_ATTEMPT]: Reducers.createOrUpdateTransactionAttempt,
    // [Types.HOME_CREATE_OR_UPDATE_TRANSACTION_SUCCESS]: Reducers.createOrUpdateTransactionSuccess,
    // [Types.HOME_CREATE_OR_UPDATE_TRANSACTION_FAILURE]: Reducers.createOrUpdateTransactionFailure,
  })
};
