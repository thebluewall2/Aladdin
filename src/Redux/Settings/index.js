import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.SETTINGS_SET_SETTINGS]: Reducers.setSettings,

    [Types.SETTINGS_SET_PUSH_NOTIFICATIONS]: Reducers.setPushNotifications,

    [Types.SETTINGS_CHANGE_PASSWORD_ATTEMPT]: Reducers.changePasswordAttempt,
    [Types.SETTINGS_CHANGE_PASSWORD_SUCCESS]: Reducers.changePasswordSuccess,
    [Types.SETTINGS_CHANGE_PASSWORD_FAILURE]: Reducers.changePasswordFailure,
  })
};
