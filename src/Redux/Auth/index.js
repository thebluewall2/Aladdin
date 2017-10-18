import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.AUTH_SET_USER_TYPE]: Reducers.setUserType,

    [Types.AUTH_LOGIN_USER]: Reducers.setUserStartLogin,
    [Types.AUTH_USER_LOGIN_SUCCESS]: Reducers.setUserLoginSuccess,
    [Types.AUTH_USER_LOGIN_FAIL]: Reducers.setUserLoginFail,

    [Types.AUTH_CUSTOMER_SIGNUP_ATTEMPT]: Reducers.setCustomerStartSignUp,
    [Types.AUTH_CUSTOMER_SIGNUP_SUCCESS]: Reducers.setCustomerSignUpSuccess,
    [Types.AUTH_CUSTOMER_SIGNUP_FAIL]: Reducers.setCustomerSignUpFail,

    [Types.AUTH_RESET_PASSWORD]: Reducers.setStartResetPassword,
    [Types.AUTH_RESET_PASSWORD_SUCCESS]: Reducers.setResetPasswordSuccess,
    [Types.AUTH_RESET_PASSWORD_FAIL]: Reducers.setResetPasswordFail,

    [Types.AUTH_VENDOR_SIGNUP_SUCCESS]: Reducers.setUserLoginSuccess,
    [Types.AUTH_VENDOR_LOGIN_FAIL]: Reducers.setUserLoginFail,
  })
};
