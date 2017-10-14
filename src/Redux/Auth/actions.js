import Types from './types';

const authSetUserType = (userType) => ({
  type: Types.AUTH_SET_USER_TYPE,
  userType
});

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

const authSignUpAttempt = (userData) => ({
  type: Types.AUTH_SIGN_UP_ATTEMPT,
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

const authResetPassword = (email, userType) => ({
  type: Types.AUTH_RESET_PASSWORD,
  email,
  userType
});

export default {
  authSetUserType,
  authLoginUser,
  userLoginSuccess,
  userLoginFail,
  authSignUpAttempt,
  userSignUpSuccess,
  userSignUpFail,
  authResetPassword
};
