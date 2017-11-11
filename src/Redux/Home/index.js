import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.HOME_SET_SEARCH_CATEGORY]: Reducers.setSearchCategory,
    [Types.HOME_SET_SEARCH_SUBCATEGORY]: Reducers.setSearchSubcategory,
  })
};
