import { fork } from 'redux-saga/effects';

import { watchLoginUser } from './login';
import { watchCustomerSignUp } from './customerSignUp';
import { watchVendorSignUp } from './vendorSignUp';

export default () => {
  function* rootSaga() {
    yield fork(watchLoginUser);
    yield fork(watchCustomerSignUp);
    yield fork(watchVendorSignUp);
  }

  return {
    rootSaga
  };
};
