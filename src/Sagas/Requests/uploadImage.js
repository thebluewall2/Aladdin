import { take, call, put } from 'redux-saga/effects';
import { Platform } from 'react-native';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import Types from '../../Redux/Requests/types';

import { showErrorToast } from '../../Services/helpers';

export function* watchUploadImage() {
  while (true) {
    const { imageUrl, trxId } = yield take(Types.REQ_UPLOAD_IMAGE);
    yield call(imageUploaderHandler, imageUrl, trxId);
  }
}

export function* imageUploaderHandler(imageUrl, trxId) {
  try {
    const properUrl = Platform.OS === 'ios' ? imageUrl.replace('file://', '') : imageUrl;

    yield call(uploadImage, properUrl, trxId);
  } catch (error) {
    console.log(error);

    showErrorToast("Something went wrong. Image not attached");
  }
}

export function uploadImage(uploadUri, trxid) {
  console.log(uploadUri);
  console.log(trxid);
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  const mime = 'application/octet-stream';

  return new Promise((resolve, reject) => {
    let uploadBlob = null;

    const imageRef = firebase.storage().ref('TransactionImages').child(trxid);

    fs.readFile(uploadUri, 'base64')
    .then((data) => {
      console.log(data);
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
