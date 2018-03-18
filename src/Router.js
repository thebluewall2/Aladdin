import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

//importing screens
import LoadingScreen from './Containers/Auth/LoadingScreen';
import LandingPage from './Containers/Auth/LandingPage';
import LoginPage from './Containers/Auth/LoginPage';

import TermsOfUse from './Containers/Settings/TermsOfUse';
import PrivacyPolicy from './Containers/Settings/PrivacyPolicy';

import CustomerSignUpPage from './Containers/Auth/SignUp/CustomerSignUpPage';

import VendorSignUpPage from './Containers/Auth/SignUp/VendorSignUpPage';
import VendorSelectCategories from './Containers/Auth/SignUp/VendorSelectCategories';
import VendorSelectSubcategories from './Containers/Auth/SignUp/VendorSelectSubcategories';

import ForgotPassword from './Containers/Auth/ForgotPassword';

import HomePage from './Containers/Home/HomePage';
import SelectSubcategory from './Containers/Home/SelectSubcategory';
import SelectAddress from './Containers/Home/SelectAddress';
import AddNewAddress from './Containers/Home/AddNewAddress';
import ChooseTimeForService from './Containers/Home/ChooseTimeForService';

import RequestsHome from './Containers/Requests/RequestsHome';
import CustomerRequestDetails from './Containers/Requests/CustomerRequestDetails';
import MakePayment from './Containers/Requests/MakePayment';
import PaymentWebView from './Containers/Requests/PaymentWebView';
import QRCodePage from './Containers/Requests/QRCodePage';
import VendorRequestDetails from './Containers/Requests/VendorRequestDetails';
import VendorSelectTime from './Containers/Requests/VendorSelectTime';
import QRScanner from './Containers/Requests/QRScanner';
import CreateReview from './Containers/Requests/CreateReview';

import VendorList from './Containers/Home/VendorList';
import VendorData from './Containers/Home/VendorData';

import Settings from './Containers/Settings/Settings';
import ChangePassword from './Containers/Settings/ChangePassword';
import EditCustomerProfile from './Containers/Settings/EditCustomerProfile';
import EditVendorProfile from './Containers/Settings/EditVendorProfile';
//end importing screens

import TabIcon from './Components/TabIcon';

const backButton = () => {
  return (
    <TouchableOpacity
      style={{
        paddingTop: 2,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => Actions.pop()}
    >
    <Icon
      name='ios-arrow-back'
      style={{
        fontSize: 30,
        color: 'white',
      }}
    />
    </TouchableOpacity>
  );
};

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth" initial navigationBarStyle={styles.authNavBarStyle} >
        <Scene
          key="loadingPage"
          component={LoadingScreen}
          initial
          hideNavBar
        />
        <Scene
          key="landingPage"
          component={LandingPage}
          hideNavBar
        />
        <Scene
          key="loginPage"
          component={LoginPage}
          hideNavBar={false}
          title={'E - R E N O'}
          {...navigatorProps}
        />
        <Scene
          key="customerSignUpPage"
          component={CustomerSignUpPage}
          title={'Sign up'}
          {...navigatorProps}
        />
        <Scene
          key="vendorSignUpPage"
          component={VendorSignUpPage}
          title={'Sign up'}
          {...navigatorProps}
        />
        <Scene
          key="forgotPassword"
          component={ForgotPassword}
          title={'Reset password'}
          {...navigatorProps}
        />
        <Scene
          key="selectCategories"
          component={VendorSelectCategories}
          title={'Select categories'}
          {...navigatorProps}
        />
        <Scene
          key="selectSubcategories"
          component={VendorSelectSubcategories}
          title={'Select subcategories'}
          {...navigatorProps}
        />
      </Scene>

      <Scene key="home" tabs >
        <Scene key="homePage" title="Home" icon={TabIcon} >
          <Scene key="homeTab" component={HomePage} hideNavBar />
          <Scene
            key="selectSubcategory"
            component={SelectSubcategory}
            hideNavBar={false}
            title={'Select subcategories'}
            {...navigatorProps}
          />
          <Scene
            key="selectAddress"
            component={SelectAddress}
            title={'Select address'}
            {...navigatorProps}
          />
          <Scene
            key="addNewAddress"
            component={AddNewAddress}
            title={'Add New Address'}
            {...navigatorProps}
          />
          <Scene
            key="vendorList"
            component={VendorList}
            title={'Choose a Vendor'}
            {...navigatorProps}
          />
          <Scene
            key="vendorDataPage"
            component={VendorData}
            title={'Vendor Details'}
            {...navigatorProps}
          />
          <Scene
            key="chooseTime"
            component={ChooseTimeForService}
            title={'Choose Time'}
            {...navigatorProps}
          />
        </Scene>

        <Scene key="requests" title="Request" icon={TabIcon} >
          <Scene
            key="requestPage"
            component={RequestsHome}
            title={'Requests'}
            {...navigatorProps}
            renderBackButton={() => (null)}
          />
          <Scene
            key="customerRequestDetails"
            component={CustomerRequestDetails}
            title={'Request Details'}
            {...navigatorProps}
          />
          <Scene
            key="makePayment"
            component={MakePayment}
            title={'Complete Service'}
            {...navigatorProps}
          />
          <Scene
            key="paymentWebView"
            component={PaymentWebView}
            title={'Complete Service'}
            {...navigatorProps}
          />
          <Scene
            key="qrCodePage"
            component={QRCodePage}
            title={'Complete Service'}
            {...navigatorProps}
          />
          <Scene
            key="vendorRequestDetails"
            component={VendorRequestDetails}
            title={'Request Details'}
            {...navigatorProps}
          />
          <Scene
            key="vendorSelectTime"
            component={VendorSelectTime}
            title={'Select Time'}
            {...navigatorProps}
          />
          <Scene
            key="qrScannerPage"
            component={QRScanner}
            title={'Complete Service'}
            {...navigatorProps}
          />
          <Scene
            key="createReview"
            component={CreateReview}
            title={'Complete Service'}
            {...navigatorProps}
          />
        </Scene>

        <Scene key="settings" title="Settings" icon={TabIcon} >
          <Scene
            key="settingsPage"
            component={Settings}
            title={'Settings'}
            {...navigatorProps}
            renderBackButton={() => null}
          />
          <Scene
            key="editCustomerProfile"
            component={EditCustomerProfile}
            title={'Edit Profile'}
            {...navigatorProps}
          />
          <Scene
            key="editVendorProfile"
            component={EditVendorProfile}
            title={'Edit Profile'}
            {...navigatorProps}
          />
          <Scene
            key="changePasswordPage"
            component={ChangePassword}
            title={'Change Password'}
            {...navigatorProps}
          />
          <Scene
            key="termsOfUse"
            component={TermsOfUse}
            title={'Terms of Use'}
            {...navigatorProps}
          />
          <Scene
            key="privacyPolicy"
            component={PrivacyPolicy}
            title={'Privacy Policy'}
            {...navigatorProps}
          />
        </Scene>
      </Scene>

    </Router>
  );
};

const styles = {
  authNavBarStyle: {
    backgroundColor: '#01579B',
  },
  titleStyle: {
    color: '#FFFFFF',
  }
};

const navigatorProps = {
  renderBackButton: backButton,
  navigationBarStyle: styles.authNavBarStyle,
  titleStyle: styles.titleStyle
};

export default RouterComponent;
