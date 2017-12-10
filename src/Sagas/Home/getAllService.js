import { take, call, put } from 'redux-saga/effects';

import { getAll } from 'firebase-saga';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchGetAllServices() {
  while (true) {
    yield take(Types.HOME_GET_ALL_SERVICES_ATTEMPT);
    yield call(handleGetAllServices);
  }
}
export function* handleGetAllServices() {
  try {
    const allServices = yield call(getAll, 'Services');
    let servicesArray = [];

    //converting to arrays
    Object.keys(allServices)
      .map(name => {
        if (name !== 'imageURL') {
          servicesArray.push({
            category: name,
            subcategories: getSubcategories(allServices[name]),
            imageURL: allServices[name].imageURL,
          });
        }
      });

    yield put(ReduxActions.homeGetAllServicesSuccess(servicesArray));
  } catch (error) {
    yield put(ReduxActions.homeGetAllServicesFail(error));
  }
}

function getSubcategories(subcategoriesFromFirebase) {
  let subcategories = [];

  Object.keys(subcategoriesFromFirebase)
    .map(sub => {
      if (sub !== 'imageURL') {
        subcategories.push({
          name: subcategoriesFromFirebase[sub].name,
          id: sub
        });
      }
    });

  return subcategories;
}
