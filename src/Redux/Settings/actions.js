import Types from './types';

const settingsSetSettings = (settings) => ({
  type: Types.SETTINGS_SET_SETTINGS,
  settings
});

const settingsSetPushNotifications = (pushNotifications) => ({
  type: Types.SETTINGS_SET_PUSH_NOTIFICATIONS,
  pushNotifications,
});

export default {
  settingsSetSettings,

  settingsSetPushNotifications,
};
