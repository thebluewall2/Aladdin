import { take, call, put } from 'redux-saga/effects';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchGetVendorList() {
  while (true) {
    const { category, subcategory } = yield take(Types.HOME_GET_VENDOR_LIST_ATTEMPT);
    yield call(handleGetVendorList, category, subcategory);
  }
}

export function handleGetVendorList(category, subcategory) {
  console.log(category);
  console.log(subcategory);
}
