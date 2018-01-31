import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { update } from 'firebase-saga';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../ReduxActions';
import Types from '../../Redux/Settings/types';

export function* watchEditProfile() {
  while (true) {
    const { userType, userUID, profileInfo } = yield take(Types.SETTINGS_EDIT_PROFILE);
    yield call(handleEditProfile, userType, userUID, profileInfo);
  }
}

export function* handleEditProfile(userType, userUID, profileInfo) {
  try {
    //coordinates
    yield call(update, `Users/${userType}/`, `${userUID}`,
    {
      ...profileInfo
    });
    //success
  } catch (error) {
    //failed
  }
}
