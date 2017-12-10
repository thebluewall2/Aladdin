import { fork } from 'redux-saga/effects';

import { watchSetPushNotifications } from './setPushNotifications';

export default () => {
  function* rootSaga() {
    yield fork(watchSetPushNotifications);
  }

  return {
    rootSaga
  };
};
