import { take, call, put } from 'redux-saga/effects';
import firebase from 'firebase';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ReduxActions from '../../Redux/Actions';
import Types from '../../Redux/Requests/types';


export function* watchImageUploader() {
  while (true) {
    const { uploadUri, trxid } = yield take(Types.REQ_IMAGE_UPLOADER_ATTEMPT);
    yield call(imageUploaderHandler, uploadUri, trxid);
  }
}

export function* imageUploaderHandler(uploadUri, trxid) {
  try {
    const properUri = Platform.OS === 'ios' ? uploadUri.replace('file://', '') : uploadUri;
    yield call(uploadImage, properUri, trxid);
    yield put(ReduxActions.requestsImageUploaderSuccess());
  } catch (erorr) {
    yield put(ReduxActions.requestsImageUploaderFailure());
  }
}

export function uploadImage(uploadUri, trxid) {
  console.log(RNFetchBlob);
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  const mime = 'application/octet-stream';
  return new Promise((resolve, reject) => {
    let uploadBlob = null;
    const imageRef = firebase.storage().ref('TransactionImages').child(trxid);
    fs.readFile(uploadUri, 'base64')
    .then((data) => {
      return Blob.build(data, { type: `${mime};BASE64` });
    })
    .then((blob) => {
      uploadBlob = blob;
      return imageRef.put(blob._ref, blob, { contentType: mime });
    })
    .then(() => {
      uploadBlob.close();
      return imageRef.getDownloadUrl();
    })
    .then((url) => {
      console.log(url);
      resolve(url);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}
