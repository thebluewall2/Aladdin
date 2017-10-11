const INITIAL_STATE = {
  userType: '',
  loading: false,
  errorMessage: '',
  userData: ''
};

const setUserType = (state = INITIAL_STATE, action) => {
  return { ...state, userType: action.userType };
};

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

export default {
  INITIAL_STATE,

  setUserType,
  setUserStartLogin,
  setUserLoginSuccess,
  setUserLoginFail,
};
