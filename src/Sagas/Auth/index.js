import { fork } from 'redux-saga/effects';

import { watchLoginUser } from './login';
import { watchUserSignUp } from './signUp';
import { watchResetPassword } from './resetPassword';

export default () => {
  function* rootSaga() {
    yield fork(watchLoginUser);
    yield fork(watchUserSignUp);
    yield fork(watchResetPassword);
  }

  return {
    rootSaga
  };
};
