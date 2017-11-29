import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.HOME_SET_SEARCH_CATEGORY]: Reducers.setSearchCategory,
    [Types.HOME_SET_SEARCH_SUBCATEGORY]: Reducers.setSearchSubcategory,

    [Types.HOME_GET_ALL_SERVICES_ATTEMPT]: Reducers.getAllServicesAttempt,
    [Types.HOME_GET_ALL_SERVICES_SUCCESS]: Reducers.getAllServicesSuccess,
    [Types.HOME_GET_ALL_SERVICES_FAIL]: Reducers.getAllServicesFail,
  })
};
