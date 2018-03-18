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
  const userType = yield call(getAllSettings);

  if (userType) {
    //if user has logged out, we would have deleted his userType from asyncstorage
    yield call(autoLoginUser, userType);
  } else {
    Actions.landingPage({ type: 'replace' });
  }
}

export function* getAllSettings() {
  const settings = yield call(getSettingsFromStorage);
  const userType = yield call(getUserTypeFromStorage);

  yield put(ReduxActions.settingsSetSettings(settings));
  yield put(ReduxActions.authSetUserType(userType));

  return userType;
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

async function getUserTypeFromStorage() {
  const userType = await AsyncStorage.getItem('userType');

  if (userType) {
    return userType;
  }

  //if user has no userType, just return empty string as per reducer's default value
  return null;
}

export function* autoLoginUser(userType) {
  const credentials = yield call(getUserCredentials);

  if (credentials) {
    const { username, password } = credentials;
    const isFromLoginPage = false;

    yield put(ReduxActions.authLoginUser(userType, username, password, isFromLoginPage));
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
