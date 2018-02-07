import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.AUTH_APP_START_UP]: Reducers.setStartUp,

    [Types.AUTH_SET_USER_TYPE]: Reducers.setUserType,
    [Types.AUTH_EMAIL_CHANGED]: Reducers.setEmailChanged,
    [Types.AUTH_PASSWORD_CHANGED]: Reducers.setPasswordChanged,

    [Types.AUTH_LOGIN_USER]: Reducers.setUserStartLogin,
    [Types.AUTH_USER_LOGIN_SUCCESS]: Reducers.setUserLoginSuccess,
    [Types.AUTH_USER_LOGIN_FAIL]: Reducers.setUserLoginFail,

    [Types.AUTH_RESET_PASSWORD_ATTEMPT]: Reducers.setResetPasswordAttempt,
    [Types.AUTH_RESET_PASSWORD_SUCCESS]: Reducers.setResetPasswordSuccess,
    [Types.AUTH_RESET_PASSWORD_FAIL]: Reducers.setResetPasswordFail,

    [Types.AUTH_SIGN_UP_ATTEMPT]: Reducers.setSignUpAttempt,
    [Types.AUTH_SIGN_UP_SUCCESS]: Reducers.setSignUpSuccess,
    [Types.AUTH_SIGN_UP_FAIL]: Reducers.setSignUpFail,

    [Types.AUTH_VENDOR_SET_DATA]: Reducers.setVendorData,
    [Types.AUTH_VENDOR_SET_CATEGORIES]: Reducers.setVendorCategories,
    [Types.AUTH_VENDOR_SET_SUBCATEGORIES]: Reducers.setVendorSubcategories,

    [Types.AUTH_ADD_NEW_ADDRESS]: Reducers.addNewAddress,

    [Types.AUTH_UPDATE_PROFILE]: Reducers.updateProfile,

    [Types.AUTH_LOG_OUT]: Reducers.logout,
  })
};
