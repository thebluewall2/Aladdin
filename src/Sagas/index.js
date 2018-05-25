import { fork } from 'redux-saga/effects';

import auth from './Auth';
import home from './Home';
import settings from './Settings';
import requests from './Requests';

import RequestsAPI from '../Services/API/RequestsAPI';

const requestAPI = RequestsAPI.create('https://us-central1-aladdinapp-942fe.cloudfunctions.net');

export default function* root() {
  yield fork(auth().rootSaga);
  yield fork(home(requestAPI).rootSaga);
  yield fork(settings().rootSaga);
  yield fork(requests(requestAPI).rootSaga);
}
