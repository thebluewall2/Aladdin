import { Platform, Dimensions } from 'react-native';

 const { height, width } = Dimensions.get('window');

export default {
  getFullParametersDomain: 'https://us-central1-aladdinapp-942fe.cloudfunctions.net/getFullParameters',
  getPaymentGatewayDomain: 'https://test2pay.ghl.com/IPGSG/Payment.aspx',
  reduxLoggerEnabled: false,

  googleGeocoderAPI: 'AIzaSyDiQJNqCwJXrP4yp8MB-5xnxbCEV4oyRt0',

  ipifyLink: 'https://api.ipify.org',

  tabBarHeight: 50,

  navBarHeight: Platform.OS === 'ios' ? 70 : 60,

  screenWidth: width,

  screenHeight: height,

  vendorMinimumReviewsToDisplay: 20,
};
