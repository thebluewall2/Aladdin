import { take, call, put } from 'redux-saga/effects';
import { Platform } from 'react-native';

import firebase from 'firebase';
import { update } from 'firebase-saga';
import RNFetchBlob from 'react-native-fetch-blob';

import Types from '../../Redux/Requests/types';

import { showErrorToast } from '../../Services/helpers';

const React = require('react-native'),
window = global || window;

export function* watchUploadImage() {
  while (true) {
    const { imageUrl, trxId } = yield take(Types.REQ_UPLOAD_IMAGE);
    yield call(imageUploaderHandler, imageUrl, trxId);
  }
}

export function* imageUploaderHandler(imageUrl, trxId) {
  try {
    const properUrl = Platform.OS === 'ios' ? imageUrl.replace('file://', '') : imageUrl;

    const downloadUrl = yield call(uploadImage, properUrl, trxId);
    yield call(update, `Transactions/`, `${trxId}`, { downloadUrl });
  } catch (error) {
    console.log(error);
    showErrorToast("Something went wrong. Image not attached");
  }
}

export function uploadImage(uploadUri, trxid) {
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
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
      return imageRef.put(blob, { contentType: mime });
    })
    .then((snapshot) => {
      uploadBlob.close();
      return snapshot.downloadURL;
    })
    .then((url) => {
      resolve(url);
    })
    .catch((error) => {
      reject(error);
    });
  });
}
