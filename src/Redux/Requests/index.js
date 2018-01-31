import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.REQ_GET_TRANSACTION_DATA_ATTEMPT]: Reducers.getTransactionDataAttempt,
    [Types.REQ_GET_TRANSACTION_DATA_SUCCESS]: Reducers.getTransactionDataSuccess,
    [Types.REQ_GET_TRANSACTION_DATA_FAILURE]: Reducers.getTransactionDataFailure,

    [Types.REQ_GET_TRANSACTION_LIST_ATTEMPT]: Reducers.getTransactionListAttempt,
    [Types.REQ_GET_TRANSACTION_LIST_SUCCESS]: Reducers.getTransactionListSuccess,
    [Types.REQ_GET_TRANSACTION_LIST_FAILURE]: Reducers.getTransactionListFailure,

    [Types.REQ_GET_PAYMENT_CONFIRMATION_ATTEMPT]: Reducers.getPaymentInfoAttempt,
    [Types.REQ_GET_PAYMENT_CONFIRMATION_SUCCESS]: Reducers.getPaymentInfoSuccess,
    [Types.REQ_GET_PAYMENT_CONFIRMATION_FAILURE]: Reducers.getPaymentInfoFailure,

    [Types.REQ_MAKE_PAYMENT_ATTEMPT]: Reducers.makePaymentAttempt,
    [Types.REQ_MAKE_PAYMENT_SUCCESS]: Reducers.makePaymentSuccess,
    [Types.REQ_MAKE_PAYMENT_FAILURE]: Reducers.makePaymentFailure,

    [Types.REQ_CREATE_REVIEW_ATTEMPT]: Reducers.createReviewAttempt,
    [Types.REQ_CREATE_REVIEW_SUCCESS]: Reducers.createReviewSuccess,
    [Types.REQ_CREATE_REVIEW_FAILURE]: Reducers.createReviewFailure,

    [Types.REQ_CLEAR_ERROR]: Reducers.clearError,
  })
};
