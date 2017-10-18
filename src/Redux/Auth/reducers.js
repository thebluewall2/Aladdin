const INITIAL_STATE = {
  userType: '',
  loading: false,
  errorMessage: '',
  userData: ''
};

const setUserType = (state = INITIAL_STATE, action) => {
  return { ...state, userType: action.userType };
};
//User Login Section
const setUserStartLogin = (state = INITIAL_STATE, action) => {
  return { ...state, loading: true, errorMessage: '' };
};
const setUserLoginSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, ...INITIAL_STATE, userData: action.userData };
};
const setUserLoginFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

//Customer Sign Up Section
const setCustomerStartSignUp = (state = INITIAL_STATE) => {
  return { ...state, loading: true, errorMessage: '' };
};

const setCustomerSignUpSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};
const setCustomerSignUpFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

//Reset Password Section
const setResetPassword = (state = INITIAL_STATE) => {
  return { ...state, loading: true, errorMessage: '' };
};
const setResetPasswordSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};
const setResetPasswordFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

export default {
  INITIAL_STATE,

  setUserType,
  setUserStartLogin,
  setUserLoginSuccess,
  setUserLoginFail,

  setCustomerStartSignUp,
  setCustomerSignUpSuccess,
  setCustomerSignUpFail,

  setResetPassword,
  setResetPasswordSuccess,
  setResetPasswordFail
};
