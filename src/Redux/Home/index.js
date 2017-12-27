import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.HOME_SET_SEARCH_CATEGORY]: Reducers.setSearchCategory,
    [Types.HOME_SET_SEARCH_SUBCATEGORY]: Reducers.setSearchSubcategory,
    [Types.HOME_SET_SEARCH_ADDRESS]: Reducers.setSearchAddress,

    [Types.HOME_GET_VENDOR_LIST_ATTEMPT]: Reducers.getVendorListAttempt,
    [Types.HOME_GET_VENDOR_LIST_SUCCESS]: Reducers.getVendorListSuccess,
    [Types.HOME_GET_VENDOR_LIST_FAILURE]: Reducers.getVendorListFailure,

    [Types.HOME_GET_ALL_SERVICES_ATTEMPT]: Reducers.getAllServicesAttempt,
    [Types.HOME_GET_ALL_SERVICES_SUCCESS]: Reducers.getAllServicesSuccess,
    [Types.HOME_GET_ALL_SERVICES_FAILURE]: Reducers.getAllServicesFailure,

    [Types.HOME_GET_VENDOR_DATA_ATTEMPT]: Reducers.getVendorDataAttempt,
    [Types.HOME_GET_VENDOR_DATA_SUCCESS]: Reducers.getVendorDataSuccess,
    [Types.HOME_GET_VENDOR_DATA_FAILURE]: Reducers.getVendorDataFailure,

    [Types.HOME_CREATE_OR_UPDATE_TRANSACTION_ATTEMPT]: Reducers.createOrUpdateTransactionAttempt,
    [Types.HOME_CREATE_OR_UPDATE_TRANSACTION_SUCCESS]: Reducers.createOrUpdateTransactionSuccess,
    [Types.HOME_CREATE_OR_UPDATE_TRANSACTION_FAILURE]: Reducers.createOrUpdateTransactionFailure,

    [Types.HOME_GET_TRANSACTION_DATA_ATTEMPT]: Reducers.getTransactionDataAttempt,
    [Types.HOME_GET_TRANSACTION_DATA_SUCCESS]: Reducers.getTransactionDataSuccess,
    [Types.HOME_GET_TRANSACTION_DATA_FAILURE]: Reducers.getTransactionDataFailure,

    [Types.HOME_GET_TRANSACTION_LIST_ATTEMPT]: Reducers.getTransactionListAttempt,
    [Types.HOME_GET_TRANSACTION_LIST_SUCCESS]: Reducers.getTransactionListSuccess,
    [Types.HOME_GET_TRANSACTION_LIST_FAILURE]: Reducers.getTransactionListFailure,
  })
};
