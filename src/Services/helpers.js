import Toast from 'react-native-toast-native';
import { Platform } from 'react-native';

export function showToast(message) {
  Toast.show(message, Toast.LONG, Toast.BOTTOM, {
    backgroundColor: "#198c8c",
    width: 350,
    height: Platform.OS === 'ios' ? 60 : undefined,
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 3,
    lines: 5,
    borderRadius: 10,
    yOffset: 40,
    fontWeight: 'bold'
  });
}

export function showErrorToast(message) {
  Toast.show(message, Toast.LONG, Toast.BOTTOM, {
    backgroundColor: "#ffffff",
    color: "#bd202e",
    width: 350,
    height: Platform.OS === 'ios' ? 60 : undefined,
    fontSize: 20,
    lineHeight: 3,
    lines: 5,
    borderRadius: 10,
    yOffset: Platform.OS === 'ios' ? 40 : 150,
  });
}
