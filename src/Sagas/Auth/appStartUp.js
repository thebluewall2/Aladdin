import { take, call, put } from 'redux-saga/effects';

import { Actions } from 'react-native-router-flux';
import * as Keychain from 'react-native-keychain';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchAppStartUp() {
  while (true) {
    yield take(Types.AUTH_APP_START_UP);
    yield call(handleStartUp);
  }
}

export function* handleStartUp() {
  yield call(getLocalServiceCategories);
  yield call(autoLoginUser);
}

export function* getLocalServiceCategories() {
  
}

export function* autoLoginUser() {
  const credentials = yield call(getUserCredentials);

  if (credentials) {
    const { username, password } = credentials;

    yield call(ReduxActions.authAppStartUp, false);
    yield put(ReduxActions.authLoginUser(username, password));
  }
}

export function getUserCredentials() {
  const credentials = Keychain.getGenericPassword()
    .catch(() => {
      return false;
    });

  return credentials;
}
