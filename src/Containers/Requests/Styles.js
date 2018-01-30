import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  requestHomeContainerViewStyle: {
    flex: 1,
    paddingBottom: 50
  },

  orderDetailsContainerViewStyle: {
    flex: 20,
    padding: 20,
    paddingTop: 10
  },

  orderDetailsTitleTextStyle: {
    fontFamily: 'Quicksand-bold',
    fontSize: 18,
    color: "#002b7a"
  },

  orderContentTextStyle: {
    fontFamily: 'Quicksand-regular',
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 5
  },

  orderSectionTextStyle: {
    fontFamily: 'Quicksand-bold',
    fontSize: 16,
    paddingTop: 15
  },

  selectTimeButtonStyle: {
    backgroundColor: '#0d1d56',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    borderRadius: 5
  },

  rejectServiceButtonStyle: {
    backgroundColor: '#bd202e',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    borderRadius: 5
  },

  timeButtonStyle: {
    backgroundColor: '#dddddd',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    borderRadius: 5
  },

  buttonTextStyle: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    fontSize: 15
  },

  makePaymentButtonStyle: {
    backgroundColor: '#0d1d56',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    borderRadius: 5
  },

  serviceCompletedTextStyle: {
    fontFamily: 'quicksand-bold',
    fontSize: 15,
    alignContent: 'center'
  },

  serviceCompletedBackgroundViewStyle: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#d1e8e8'
  },

  completeRequestButtonStyle: {
    backgroundColor: '#198c8c',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderRadius: 5,
    padding: 5
  },

  completeRequestButtonViewStyle: {
    paddingTop: 15,
    alignItems: 'center',
    flex: 1
  },

  qrCodeContainerViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start',
    paddingTop: 80
  },

  qrCodeTextStyle: {
    fontFamily: 'quicksand-regular',
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 30
  },

  qrCodeViewStyle: {
    flex: 1,
    flexDirection: 'column', 
    alignItems: 'center'
  },

});
