import Toast from 'react-native-toast-native';

export function showToast(message) {
  Toast.show(message, Toast.LONG, Toast.BOTTOM, {
    width: 100,
    height: 30,
    backgroundColor: '#4ADDFB',
    color: 'blue',
  });
}
