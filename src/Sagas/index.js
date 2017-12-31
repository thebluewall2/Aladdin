import { fork } from 'redux-saga/effects';

import auth from './Auth';
import home from './Home';
import settings from './Settings';
import requests from './Requests';

export default function* root() {
  yield fork(auth().rootSaga);
  yield fork(home().rootSaga);
  yield fork(settings().rootSaga);
  yield fork(requests().rootSaga);
}
