import { fork } from 'redux-saga/effects';

import auth from './Auth';

export default function * root() {
  yield fork(auth().rootSaga);
}
