import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.REQ_RESET_REDUX]: Reducers.resetRedux,
    
    [Types.REQ_GET_TRANSACTION_DATA_ATTEMPT]: Reducers.getTransactionDataAttempt,
    [Types.REQ_GET_TRANSACTION_DATA_SUCCESS]: Reducers.getTransactionDataSuccess,
    [Types.REQ_GET_TRANSACTION_DATA_FAILURE]: Reducers.getTransactionDataFailure,

    [Types.REQ_GET_TRANSACTION_LIST_ATTEMPT]: Reducers.getTransactionListAttempt,
    [Types.REQ_GET_TRANSACTION_LIST_SUCCESS]: Reducers.getTransactionListSuccess,
    [Types.REQ_GET_TRANSACTION_LIST_FAILURE]: Reducers.getTransactionListFailure,

    [Types.REQ_GET_SINGLE_TRANSACTION_ATTEMPT]: Reducers.getSingleTransactionAttempt,
    [Types.REQ_GET_SINGLE_TRANSACTION_SUCCESS]: Reducers.getSingleTransactionSuccess,
    [Types.REQ_GET_SINGLE_TRANSACTION_FAILURE]: Reducers.getSingleTransactionFailure,

    [Types.REQ_GET_PAYMENT_CONFIRMATION_ATTEMPT]: Reducers.getPaymentInfoAttempt,
    [Types.REQ_GET_PAYMENT_CONFIRMATION_SUCCESS]: Reducers.getPaymentInfoSuccess,
    [Types.REQ_GET_PAYMENT_CONFIRMATION_FAILURE]: Reducers.getPaymentInfoFailure,

    [Types.REQ_MAKE_PAYMENT_ATTEMPT]: Reducers.makePaymentAttempt,
    [Types.REQ_MAKE_PAYMENT_SUCCESS]: Reducers.makePaymentSuccess,
    [Types.REQ_MAKE_PAYMENT_FAILURE]: Reducers.makePaymentFailure,

    [Types.REQ_CREATE_REVIEW_ATTEMPT]: Reducers.createReviewAttempt,
    [Types.REQ_CREATE_REVIEW_SUCCESS]: Reducers.createReviewSuccess,
    [Types.REQ_CREATE_REVIEW_FAILURE]: Reducers.createReviewFailure,

    [Types.REQ_SCAN_QR_CODE_ATTEMPT]: Reducers.scanQrCodeAttempt,
    [Types.REQ_SCAN_QR_CODE_SUCCESS]: Reducers.scanQrCodeSuccess,
    [Types.REQ_SCAN_QR_CODE_FAILURE]: Reducers.scanQrCodeFailure,

    [Types.REQ_REJECT_SERVICE_ATTEMPT]: Reducers.rejectUserAttempt,
    [Types.REQ_REJECT_SERVICE_SUCCESS]: Reducers.rejectUserSuccess,
    [Types.REQ_REJECT_SERVICE_FAILURE]: Reducers.rejectUserFailure,

    [Types.REQ_CLEAR_ERROR]: Reducers.clearError,
  })
};
