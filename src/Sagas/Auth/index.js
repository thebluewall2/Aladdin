import { fork } from 'redux-saga/effects';

import { watchLoginUser } from './login';
import { watchSignUp } from './signup';

export default () => {
  function* rootSaga() {
    yield fork(watchLoginUser);
    yield fork(watchSignUp);
  }

  return {
    rootSaga
  };
};
