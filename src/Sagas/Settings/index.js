import { fork } from 'redux-saga/effects';

import { watchSetPushNotifications } from './setPushNotifications';
import { watchChangePassword } from './changePassword';
import { watchEditProfile } from './editProfile';

export default () => {
  function* rootSaga() {
    yield fork(watchSetPushNotifications);
    yield fork(watchChangePassword);
    yield fork(watchEditProfile);
  }

  return {
    rootSaga
  };
};
