import { fork } from 'redux-saga/effects';

import { watchSetPushNotifications } from './setPushNotifications';
import { watchChangePassword } from './changePassword';

export default () => {
  function* rootSaga() {
    yield fork(watchSetPushNotifications);
    yield fork(watchChangePassword);
  }

  return {
    rootSaga
  };
};
