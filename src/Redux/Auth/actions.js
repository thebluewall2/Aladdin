import Types from './types';

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

const authLoginUser = (email, password) => ({
  type: Types.AUTH_LOGIN_USER,
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

const authVendorSetSubcategories = (subcategories) => ({
  type: Types.AUTH_VENDOR_SET_SUBCATEGORIES,
  subcategories
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

export default {
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
  authVendorSetSubcategories,

  //Reset Password section
  authResetPasswordAttempt,
  authResetPasswordSuccess,
  authResetPasswordFail,
};
