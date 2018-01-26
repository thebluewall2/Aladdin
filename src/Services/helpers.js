import Toast from 'react-native-toast-native';

export function showToast(message) {
  Toast.show(message, Toast.LONG, Toast.BOTTOM, {
    backgroundColor: "#198c8c",
    width: 350,
    height: 60,
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
    backgroundColor: "white",
    color: "bd202e",
    width: 350,
    height: 60,
    fontSize: 20,
    lineHeight: 3,
    lines: 5,
    borderRadius: 10,
    yOffset: 40,
    fontWeight: 'bold'
  });
}
