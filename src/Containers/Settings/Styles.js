import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({

  legalContainer: {
    flex: 1,
  },

  legalTextStyle: {
    paddingTop: 30,
    fontFamily: "quicksand-bold",
    fontWeight: '500',
    paddingLeft: 8,
    paddingBottom: 5,
    fontSize: 18
  },

  titleStyle: {
    paddingTop: 80,
    paddingLeft: 15
  },

  contentStyle: {
    padding: 20,
    paddingLeft: 15,
  },

  buttonStyle: {
    backgroundColor: '#37474F',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    borderRadius: 10,
  },

  buttonTextStyle: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    fontSize: 18
  },

  saveButtonStyle: {
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  changePasswordContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },

  errorMessageStyle: {
    color: 'red',
    fontFamily: 'Quicksand',
    textAlign: 'center'
  },

  successMessageStyle: {
    color: '#4BB543',
    fontFamily: 'Quicksand',
    textAlign: 'center'
  },

  editProfileContainerStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 70,
    flex: 1,
    paddingBottom: 50,
    backgroundColor: 'white'
  },

  disabledTextInputStyle: {
    color: '#6E6E6E',
    height: Platform.OS === 'ios' ? 30 : 50,
    width: 330,
    fontFamily: 'Quicksand-light',
  },

  titleSignUpStyle: {
    fontFamily: 'Quicksand',
    fontSize: 22,
    paddingTop: 15
  },

  textInputStyle: {
    height: Platform.OS === 'ios' ? 30 : 50,
    width: 330,
    fontFamily: 'Quicksand-regular'
  },

  modalPickerStyle: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  modalPickerSelectTextStyle: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    color: '#47525E'
  },

  modalPickerOptionTextStyle: {
  fontFamily: 'Quicksand',
  color: '#000000'
  },

  modalPickerCancelTextStyle: {
  fontFamily: 'Quicksand',
  color: '#000000'
  },

  editProfileTextStyle: {
    fontFamily: 'quicksand',
    fontSize: 13,
  },

  modalPickerViewStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : 15
  }

});
