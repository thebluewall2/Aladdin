import { Platform, StyleSheet } from 'react-native';
import Config from '../../Services/config';

export default StyleSheet.create({
  landingPageMainContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 80,
    backgroundColor: 'white'
  },

  loginPageMainContainer: {
    alignItems: 'center',
    paddingTop: Config.navBarHeight,
    flex: 1,
  },

  signUpPageMainContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: Config.navBarHeight,
    flex: 1,
    backgroundColor: 'white'
  },

  quicksandText: {
    fontFamily: 'Quicksand',
    fontSize: 13,
    color: '#47525E'
  },

  quicksandTextSlogan: {
    paddingTop: 15,
    paddingBottom: 20,
    fontFamily: 'Quicksand',
    fontSize: 15,
    color: '#47525E'
  },
  quicksandTextDescription: {
    paddingTop: 15,
    // paddingBottom: 25,
    fontFamily: 'Quicksand',
    fontSize: 15,
    color: '#47525E',
    textAlign: 'center'
  },
  quicksandTitle: {
    fontFamily: 'Quicksand',
    fontSize: 22,
    paddingTop: 50
  },
  quicksandSubTitle: {
    fontFamily: 'Quicksand',
    fontSize: 16,
    paddingTop: 30,
    paddingBottom: 20
  },
  quicksandItalic: {
    fontFamily: 'Quicksand',
    fontStyle: 'italic',
    fontSize: 20
  },
  buttonImage: {
    height: 80,
    width: 80,
    paddingBottom: 40
  },

  buttonCaption: {
    alignSelf: 'center',
    fontFamily: 'Quicksand',
    fontSize: 20,
    paddingTop: 16,
  },
  vendorCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    backgroundColor: '#FFE758'
  },
  customerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    backgroundColor: '#C1E1FA'
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 15
  },
  buttonStyle: {
    backgroundColor: '#37474F',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    borderRadius: 10,
  },
  loginViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkForgetPasswordStyle: {
    color: '#212121',
    fontSize: 13,
    backgroundColor: 'transparent',
  },
  forgetPasswordContainerStyle: {
    flexDirection: 'row',
    width: '80%',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSignUpStyle: {
    fontFamily: 'Quicksand',
    fontSize: 22,
    paddingTop: 15
  },
  tAndCStyle: {
    fontFamily: 'Quicksand-light',
    fontSize: 15,
    paddingTop: 15,
    width: 330,
    alignItems: 'center'
  },
  tAndCLinkStyle: {
    fontFamily: 'Quicksand-bold',
    paddingTop: 10,
    fontSize: 15,
    color: '#1965B0',
  },

  signUpTextFieldStyle: {
    width: 330,
    fontFamily: 'Quicksand-light',
    height: Platform.OS === 'ios' ? 30 : 40,
  },

  signUpButtonStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  vendorNextButtonStyle: {
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  linkStyleServiceProvider: {
    color: '#2980B9',
    fontFamily: 'Quicksand-bold',
    paddingTop: 30,
    textAlign: 'center',
    paddingBottom: 30,
    fontSize: 17
  },
  selectCategoriesContainer: {
    marginTop: 70,
    elevation: 1,
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

  errorMessageStyle: {
    color: 'red',
    fontFamily: 'Quicksand',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingTop: 10,
  },

  iconStyle: {
    width: 130,
    height: 130,
  },

  loginPageTextInputStyle: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    fontSize: 14,
    color: '#707588'
  },

  textFieldStyle: {
    width: 330,
    fontFamily: 'Quicksand-light',
    height: Platform.OS === 'ios' ? 30 : 40,
  },

  textInputViewStyle: {
    flexDirection: 'row',
    paddingTop: 20,
    width: '80%',
    height: 60
  },

  loginIconTextInputViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 5
  },

  loginButtonStyle: {
    backgroundColor: '#003366',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  }

});
