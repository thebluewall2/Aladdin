import { fork } from 'redux-saga/effects';

import { watchLoginUser } from './login';
import { watchSignUp } from './signUp';

export default () => {
  function* rootSaga() {
    yield fork(watchLoginUser);
    yield fork(watchSignUp);
  }

  return {
    rootSaga
  };
};
