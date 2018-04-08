import Types from './types';

const settingsSetSettings = (settings) => ({
  type: Types.SETTINGS_SET_SETTINGS,
  settings
});

const settingsSetPushNotifications = (pushNotifications) => ({
  type: Types.SETTINGS_SET_PUSH_NOTIFICATIONS,
  pushNotifications,
});

const settingsChangePasswordAttempt = (oldPassword, newPassword) => ({
  type: Types.SETTINGS_CHANGE_PASSWORD_ATTEMPT,
  oldPassword,
  newPassword,
});

const settingsChangePasswordSuccess = (successMsg) => ({
  type: Types.SETTINGS_CHANGE_PASSWORD_SUCCESS,
  successMsg,
});

const settingsChangePasswordFailure = (errorMsg) => ({
  type: Types.SETTINGS_CHANGE_PASSWORD_FAILURE,
  errorMsg
});

const settingsEditProfileAttempt = (userType, userUID, profileInfo) => ({
  type: Types.SETTINGS_EDIT_PROFILE_ATTEMPT,
  userType,
  userUID,
  profileInfo,
});

const settingsEditProfileSuccess = () => ({
  type: Types.SETTINGS_EDIT_PROFILE_SUCCESS,
});

const settingsEditProfileFailure = (error) => ({
  type: Types.SETTINGS_EDIT_PROFILE_FAILURE,
  error
});

export default {
  settingsSetSettings,

  settingsSetPushNotifications,

  settingsChangePasswordAttempt,
  settingsChangePasswordSuccess,
  settingsChangePasswordFailure,

  settingsEditProfileAttempt,
  settingsEditProfileSuccess,
  settingsEditProfileFailure,
};
