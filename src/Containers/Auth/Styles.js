import { StyleSheet } from 'react-native';

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
    flexDirection: 'column',
    paddingTop: 90,
    flex: 1,
    paddingBottom: 80,
    backgroundColor: 'white'
  },

  signUpPageMainContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 90,
    flex: 1,
    paddingBottom: 10,
    backgroundColor: 'white'
  },

  quicksandText: {
    fontFamily: 'Quicksand',
    fontSize: 13,
    color: '#47525E'
  },

  quicksandTextSlogan: {
    paddingTop: 20,
    paddingBottom: 25,
    fontFamily: 'Quicksand',
    fontSize: 13,
    color: '#47525E'
  },
  quicksandTextDescription: {
    paddingTop: 20,
    paddingBottom: 25,
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
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontSize: 18
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
  linkStyleForgetPassword: {
    color: '#0284CC',
    fontFamily: 'Quicksand-bold',
    paddingTop: 33,
    fontSize: 15
  },
  linkStyleSignUpNow: {
    color: '#FFCC00',
    fontFamily: 'Quicksand-bold',
    paddingTop: 30,
    fontSize: 17
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
    height: 30,
    width: 330,
    fontFamily: 'Quicksand-LightItalic',
  },

  signUpButtonStyle: {
    paddingTop: 20,
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
  }
});
