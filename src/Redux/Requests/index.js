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
  })
};