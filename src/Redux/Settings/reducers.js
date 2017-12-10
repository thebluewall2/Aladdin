const INITIAL_STATE = {
  settings: {},
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


export default {
  INITIAL_STATE,

  setSettings,

  setPushNotifications,
};
