import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { get, update } from 'firebase-saga';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Home/types';

export function* watchCreateReview() {
  while (true) {
    const { vendorUID, review } = yield take(Types.HOME_CREATE_REVIEW);
    yield call(handleCreateReview, vendorUID, review);
  }
}

export function* handleCreateReview(vendorUID, review) {
  try {
    const reviewScoreFromFirebase = yield call(get, `Users/vendor/${vendorUID}`, 'reviews');
    const newReview =
      { totalReviews: reviewScoreFromFirebase.totalReviews + 1,
        totalScores: reviewScoreFromFirebase.totalScores + review,
      };
    yield call(update, `Users/vendor/${vendorUID}`, 'reviews', newReview);

    ReduxActions.sucessHeree
  } catch (error) {
    ReduxActions.faillllllHere
  }
}
