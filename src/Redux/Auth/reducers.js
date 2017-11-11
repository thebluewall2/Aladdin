const INITIAL_STATE = {
  userType: '',
  email: '',
  password: '',
  loading: false,
  successMessage: '',
  errorMessage: '',
  userData: '',
  vendorData: '',
};

const setUserType = (state = INITIAL_STATE, action) => {
  return { ...state,
    userType: action.userType
  };
};

const setEmailChanged = (state = INITIAL_STATE, action) => {
  return { ...state,
    email: action.email
  };
};

const setPasswordChanged = (state = INITIAL_STATE, action) => {
  return { ...state,
    password: action.password
  };
};

//User Login Section
const setUserStartLogin = (state = INITIAL_STATE) => {
  return { ...state,
    loading: true,
    errorMessage: ''
  };
};

const setUserLoginSuccess = (state = INITIAL_STATE, action) => {
  return { ...state,
    ...INITIAL_STATE,
    email: action.userData.email,
    userData: action.userData
  };
};

const setUserLoginFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

const setUserSignUpFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  };
};

const setVendorData = (state = INITIAL_STATE, action) => {
  return { ...state,
    vendorData: action.vendorData
  };
};

const setVendorCategories = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    vendorData: {
      ...state.vendorData,
      categories: action.categories,
    }
  };
};

const setVendorSubcategories = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    vendorData: {
      ...state.vendorData,
      subcategories: action.subcategories
    }
  };
};

//Reset Password Section
const setResetPasswordAttempt = (state = INITIAL_STATE) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return { ...state,
    loading: true,
    errorMessage: ''
  };
=======
  return { ...state, loading: true, email: 'kevinleechenchuen@gmail.com' };
>>>>>>> Stashed changes
=======
  return { ...state, loading: true, email: 'kevinleechenchuen@gmail.com' };
>>>>>>> Stashed changes
};

const setResetPasswordSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: false,
    successMessage: "Email sent!"
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
  setEmailChanged,
  setPasswordChanged,
  setUserStartLogin,
  setUserLoginSuccess,
  setUserLoginFail,

  setUserSignUpFail,
  setVendorData,
  setVendorCategories,
  setVendorSubcategories,

  setResetPasswordAttempt,
  setResetPasswordSuccess,
  setResetPasswordFail,
};
