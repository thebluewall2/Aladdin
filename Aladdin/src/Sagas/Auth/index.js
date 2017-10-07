import { fork } from 'redux-saga/effects';

import { watchLoginUser } from './login';

export default () => {
  function* rootSaga() {
    yield fork(watchLoginUser);
  }

  return {
    rootSaga
  };
}
