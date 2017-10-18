import { fork } from 'redux-saga/effects';

import { watchLoginUser } from './login';
import { watchUserSignUp } from './signUp';

export default () => {
  function* rootSaga() {
    yield fork(watchLoginUser);
    yield fork(watchUserSignUp);
  }

  return {
    rootSaga
  };
};
