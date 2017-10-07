const INITIAL_STATE = {
  userType: ''
};

const setUserType = (state = INITIAL_STATE, action) => {
  return { ...state, userType: action.userType };
};

export default {
  INITIAL_STATE,

  setUserType,
};
