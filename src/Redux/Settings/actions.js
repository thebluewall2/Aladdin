import Types from './types';

const settingsSetSettings = (settings) => ({
  type: Types.SETTINGS_SET_SETTINGS,
  settings
});

export default {
  settingsSetSettings,
};
