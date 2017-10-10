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


export default {
  authSetUserType,
  authLoginUser,
  userLoginSuccess,
  userLoginFail
};
