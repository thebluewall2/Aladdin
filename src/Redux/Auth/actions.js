import Types from './types';

const authAppStartUp = (startingUp) => ({
  type: Types.AUTH_APP_START_UP,
  startingUp
});

const authSetUserType = (userType) => ({
  type: Types.AUTH_SET_USER_TYPE,
  userType
});

//User Auth Section
const authEmailChanged = (email) => ({
  type: Types.AUTH_EMAIL_CHANGED,
  email,
});

const authPasswordChanged = (password) => ({
  type: Types.AUTH_PASSWORD_CHANGED,
  password,
});

const authLoginUser = (userType, email, password) => ({
  type: Types.AUTH_LOGIN_USER,
  userType,
  email,
  password
});

const authUserLoginSuccess = (userData) => ({
  type: Types.AUTH_USER_LOGIN_SUCCESS,
  userData,
});

const authUserLoginFail = (error) => ({
  type: Types.AUTH_USER_LOGIN_FAIL,
  error
});

const authUserSignUpAttempt = (userData) => ({
  type: Types.AUTH_SIGN_UP_ATTEMPT,
  userData
});

const authUserSignUpSuccess = () => ({
  type: Types.AUTH_SIGN_UP_SUCCESS,
});

const authUserSignUpFail = (error) => ({
  type: Types.AUTH_SIGN_UP_FAIL,
  error
});

const authVendorSetData = (vendorData) => ({
  type: Types.AUTH_VENDOR_SET_DATA,
  vendorData
});

const authVendorSetCategories = (categories) => ({
  type: Types.AUTH_VENDOR_SET_CATEGORIES,
  categories
});

//Reset Password section
const authResetPasswordAttempt = (email, userType) => ({
  type: Types.AUTH_RESET_PASSWORD_ATTEMPT,
  email,
  userType
});

const authResetPasswordSuccess = () => ({
  type: Types.AUTH_RESET_PASSWORD_SUCCESS,
});

const authResetPasswordFail = (error) => ({
  type: Types.AUTH_RESET_PASSWORD_FAIL,
  error
});

const authAddNewAddress = (address) => ({
  type: Types.AUTH_ADD_NEW_ADDRESS,
  address
});

const authUpdateProfile = (userInfo) => ({
  type: Types.AUTH_UPDATE_PROFILE,
  userInfo
});

const authLogout = () => ({
  type: Types.AUTH_LOG_OUT,
});


export default {
  authAppStartUp,

  authSetUserType,
  authEmailChanged,
  authPasswordChanged,
  //User Auth Section
  authLoginUser,
  authUserLoginSuccess,
  authUserLoginFail,

  authUserSignUpAttempt,
  authUserSignUpSuccess,
  authUserSignUpFail,
  authVendorSetData,
  authVendorSetCategories,

  //Reset Password section
  authResetPasswordAttempt,
  authResetPasswordSuccess,
  authResetPasswordFail,

  authAddNewAddress,

  authUpdateProfile,

  authLogout,
};
