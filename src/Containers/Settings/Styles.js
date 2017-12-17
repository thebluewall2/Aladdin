import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  legalContainer: {
    flex: 1,
    paddingBottom: 40
  },

  titleStyle: {
    paddingTop: 80,
    paddingLeft: 15
  },

  contentStyle: {
    padding: 20,
    paddingLeft: 15
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

});
