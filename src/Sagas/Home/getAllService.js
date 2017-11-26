import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { getAll } from 'firebase-saga';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchGetAllSevices() {
  while (true) {
    const { email, userType } = yield take(Types.HOME_GET_ALL_SERVICES_ATTEMPT);
    yield call(handleGetAllServices, email, userType);
  }
}
//might not need userType
export function* handleGetAllServices() {
  try {
    const allServices = yield call(getAll, 'Services');
    console.log(allServices);
    yield put(ReduxActions.homeGetAllServicesSuccess(allServices));
  } catch (error) {
    console.log(error);
    yield put(ReduxActions.homeGetAllServicesFail(error));
  }
}
