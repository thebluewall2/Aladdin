import { take, call, put } from 'redux-saga/effects';

import firebase from 'firebase';
import { get, update } from 'firebase-saga';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';
import { showToast, showErrorToast } from '../../Services/helpers';

export function* watchCreateReview() {
  while (true) {
    const { vendorUID, review } = yield take(Types.REQ_CREATE_REVIEW_ATTEMPT);
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

    showToast("Thank you for leaving a review");

    yield put(ReduxActions.requestsCreateReviewSuccess());
  } catch (error) {
    showErrorToast("Something went wrong, unable to leave review");

    yield put(ReduxActions.requestsCreateReviewFailure());
  }
}