import { take, call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { Actions } from 'react-native-router-flux';
import * as Keychain from 'react-native-keychain';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchAppStartUp() {
  while (true) {
    const { startingUp } = yield take(Types.AUTH_APP_START_UP);

    if (startingUp) {
      yield call(handleStartUp);
    }
  }
}

export function* handleStartUp() {
  yield call(getAllSettings);
  yield call(autoLoginUser);
}

export function* getAllSettings() {
  const settings = yield call(getSettingsFromStorage);

  yield put(ReduxActions.settingsSetSettings(settings));
}

async function getSettingsFromStorage() {
  const settings = await AsyncStorage.getItem('settings');

  if (settings) {
    return JSON.parse(settings);
  }

  //if no settings set yet, set some default settings
  const defaultSettings = {
    pushNotifications: true
  };

  await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings));

  return defaultSettings;
}

export function* autoLoginUser() {
  const credentials = yield call(getUserCredentials);

  if (credentials) {
    const { username, password } = credentials;

    yield put(ReduxActions.authLoginUser(username, password));
  } else {
    yield put(ReduxActions.authAppStartUp(false));
  }
}

export function getUserCredentials() {
  const credentials = Keychain.getGenericPassword()
    .catch(() => {
      return false;
    });

  return credentials;
}
