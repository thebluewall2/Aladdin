const INITIAL_STATE = {
  settings: {},
};

const setSettings = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    settings: action.settings,
  };
};


export default {
  INITIAL_STATE,

  setSettings
};
