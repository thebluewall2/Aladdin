import { take, call, put } from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { get } from 'firebase-saga';
import { Actions } from 'react-native-router-flux';
import { setGenericPassword } from 'react-native-keychain';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';


export function* watchLoginUser() {
  while (true) {
    const { userType, email, password } = yield take(Types.AUTH_LOGIN_USER);

    yield call(handleLoginUser, userType, email, password);
  }
}

export function* handleLoginUser(userType, email, password) {
  try {
    const userData = yield call(firebaseAuth, email, password);
    const userInfo = yield call(get, `Users/${userType}`, userData.uid);

    const response = cleanResponse(email, userData.uid, userInfo);

    //save password so that we can autologin next time user opens app
    setGenericPassword(email, password);
    saveUserType(userType);

    yield put(ReduxActions.authUserLoginSuccess(response));
    yield put(ReduxActions.authAppStartUp(false));

    Actions.home();
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      error.message = "User Not Found";
    }

    yield put(ReduxActions.authUserLoginFail(error));
  }
}

export function firebaseAuth(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => { throw error; });
}

async function saveUserType(userType) {
  await AsyncStorage.setItem('userType', userType);
}

export function cleanResponse(email, uid, userInfo) {
  //in the future, we might we returning array of addresses
  //so convert address to array for now
  const { name, address, city, postcode, state } = userInfo;

  return {
    email,
    uid,
    fullName: name,
    address: [{
      address,
      postcode,
      state,
      city
    }]
  };
}
