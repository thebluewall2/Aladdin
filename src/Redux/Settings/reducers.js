const INITIAL_STATE = {
  settings: {},
  attempting: false,
  errorMsg: '',
  successMsg: '',
};

const setSettings = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    settings: action.settings,
  };
};

const setPushNotifications = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    settings: {
      ...state.settings,
      pushNotifications: action.pushNotifications,
    }
  };
};

const changePasswordAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    attempting: true,
    errorMsg: '',
    successMsg: '',
  };
};

const changePasswordSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    attempting: false,
    errorMsg: '',
    successMsg: action.successMsg
  };
};

const changePasswordFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    attempting: false,
    errorMsg: action.errorMsg,
    successMsg: '',
  };
};

export default {
  INITIAL_STATE,

  setSettings,

  setPushNotifications,

  changePasswordAttempt,
  changePasswordSuccess,
  changePasswordFailure,
};
