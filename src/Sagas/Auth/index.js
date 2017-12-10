import { fork } from 'redux-saga/effects';

import { watchAppStartUp } from './appStartUp';
import { watchLoginUser } from './login';
import { watchUserSignUp } from './signUp';
import { watchResetPassword } from './resetPassword';
import { watchLogout } from './logout';

export default () => {
  function* rootSaga() {
    yield fork(watchAppStartUp);
    yield fork(watchLoginUser);
    yield fork(watchUserSignUp);
    yield fork(watchResetPassword);
    yield fork(watchLogout);
  }

  return {
    rootSaga
  };
};
