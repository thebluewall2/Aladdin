import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.AUTH_SET_USER_TYPE]: Reducers.setUserType,
    [Types.AUTH_LOGIN_USER]: Reducers.setUserStartLogin,
    [Types.AUTH_USER_LOGIN_SUCCESS]: Reducers.setUserLoginSuccess,
    [Types.AUTH_USER_LOGIN_FAIL]: Reducers.setUserLoginFail,
    [Types.AUTH_USER_SIGNUP_SUCCESS]: Reducers.setUserLoginSuccess,
    [Types.AUTH_USER_LOGIN_FAIL]: Reducers.setUserLoginFail,
  })
};
