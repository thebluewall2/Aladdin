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

const userLoginSuccess = (userData) => ({
  type: Types.AUTH_USER_LOGIN_SUCCESS,
  userData,
});

const userLoginFail = (error) => ({
  type: Types.AUTH_USER_LOGIN_FAIL,
  error
});

const authUserSignUpAttempt = (userData) => ({
  type: Types.AUTH_USER_SIGNUP_ATTEMPT,
  userData
});

const userSignUpSuccess = (userData) => ({
  type: Types.AUTH_USER_SIGNUP_SUCCESS,
  userData
});

const userSignUpFail = (error) => ({
  type: Types.AUTH_USER_SIGNUP_FAIL,
  error
});

//Vendor Auth Section
const vendorSignUpSuccess = (error) => ({
  type: Types.AUTH_VENDOR_SIGNUP_SUCCESS,
  error
});

const vendorSignUpFail = (error) => ({
  type: Types.AUTH_VENDOR_SIGNUP_FAIL,
  error
});

const authResetPassword = (email, userType) => ({
  type: Types.AUTH_RESET_PASSWORD,
  email,
  userType

});

export default {
  authSetUserType,
  //User Auth Section
  authLoginUser,
  userLoginSuccess,
  userLoginFail,
  authUserSignUpAttempt,
  userSignUpSuccess,
  userSignUpFail,
  authResetPassword,
  //Vendor Auth Section
  //for vendor login
  vendorSignUpSuccess,
  vendorSignUpFail,
};
