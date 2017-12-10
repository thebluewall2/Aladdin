import { take, call, put } from 'redux-saga/effects';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Settings/types';

export function* watchChangePassword() {
  while (true) {
    const { oldPassword, newPassword } = yield take(Types.SETTINGS_CHANGE_PASSWORD_ATTEMPT);
    yield call(handleChangePassword, oldPassword, newPassword);
  }
}

export function* handleChangePassword(oldPassword, newPassword) {
  let errorMessage = "ERROR";
  console.log(oldPassword);
  console.log(newPassword);
  console.log("change password here");

  yield put(ReduxActions.settingsChangePasswordSuccess("Password successfully changed!"));
  yield put(ReduxActions.settingsChangePasswordFailure(errorMessage));
}
