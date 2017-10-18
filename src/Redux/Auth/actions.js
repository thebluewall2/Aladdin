import Types from './types';

const authSetUserType = (userType) => ({
  type: Types.AUTH_SET_USER_TYPE,
  userType
});

//User Auth Section
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
  type: Types.AUTH_USER_SIGNUP_ATTEMPT,
  userData
});

const authUserSignUpSuccess = (userData) => ({
  type: Types.AUTH_USER_SIGNUP_SUCCESS,
  userData
});

const authUserSignUpFail = (error) => ({
  type: Types.AUTH_USER_SIGNUP_FAIL,
  error
});

//Vendor Auth Section
const authVendorSignUpAttempt = (error) => ({
  type: Types.AUTH_VENDOR_SIGNUP_ATTEMPT,
  error
});

const authVendorSignUpSuccess = (error) => ({
  type: Types.AUTH_VENDOR_SIGNUP_SUCCESS,
  error
});

const authVendorSignUpFail = (error) => ({
  type: Types.AUTH_VENDOR_SIGNUP_FAIL,
  error
});

//Reset Password section
const authResetPassword = (email, userType) => ({
  type: Types.AUTH_RESET_PASSWORD,
  email,
  userType
});


export default {
  authSetUserType,
  //User Auth Section
  authLoginUser,
  authUserLoginSuccess,
  authUserLoginFail,
  authUserSignUpAttempt,
  authUserSignUpSuccess,
  authUserSignUpFail,
  //Reset Password section
  authResetPassword,

  //Vendor Auth Section
  //for vendor login
  authVendorSignUpAttempt,
  authVendorSignUpSuccess,
  authVendorSignUpFail,
};
