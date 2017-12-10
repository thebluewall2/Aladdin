import { take, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Settings/types';

export function* watchSetPushNotifications() {
  while (true) {
    const { pushNotifications } = yield take(Types.SETTINGS_SET_PUSH_NOTIFICATIONS);
    yield call(handleSetSettings, pushNotifications);
  }
}

async function handleSetSettings(pushNotifications) {
  const newSettings = {
    pushNotifications
  };

  await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
}
