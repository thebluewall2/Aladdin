import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

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
          titleStyle={styles.titleStyle} title={'E - R E N O'}
        />
        <Scene
          key="customerSignUpPage"
          component={CustomerSignUpPage}
          titleStyle={styles.titleStyle} title={'Sign up'}
        />
        <Scene
          key="vendorSignUpPage"
          component={VendorSignUpPage}
          titleStyle={styles.titleStyle} title={'Sign up'}
        />
        <Scene
          key="forgotPassword"
          component={ForgotPassword}
          titleStyle={styles.titleStyle} title={'Reset password'}
        />
        <Scene
          key="selectCategories"
          component={VendorSelectCategories}
          title={'Select categories'}
        />
        <Scene
          key="selectSubcategories"
          component={VendorSelectSubcategories}
          title={'Select subcategories'}
        />
      </Scene>

      <Scene key="home" tabs >
        <Scene key="homePage" title="Home" icon={TabIcon} >
          <Scene key="homeTab" component={HomePage} hideNavBar />
          <Scene key="selectSubcategory" component={SelectSubcategory} hideNavBar={false} />
          <Scene key="selectAddress" component={SelectAddress} title={'Select address'} />
          <Scene key="addNewAddress" component={AddNewAddress} title={'Add New Address'} />
          <Scene key="vendorList" component={VendorList} />
          <Scene key="vendorDataPage" component={VendorData} />
          <Scene key="chooseTime" component={ChooseTimeForService} />
        </Scene>
        <Scene key="requests" title="Request" icon={TabIcon} >
          <Scene key="requestPage" component={RequestsHome} renderBackButton={() => (null)} />
          <Scene key="customerRequestDetails" component={CustomerRequestDetails} />
          <Scene key="qrCodePage" component={QRCodePage} />
          <Scene key="vendorRequestDetails" component={VendorRequestDetails} />
          <Scene key="vendorSelectTime" component={VendorSelectTime} />
          <Scene key="qrScannerPage" component={QRScanner} />
          <Scene key="createReview" component={CreateReview} />
        </Scene>

        <Scene key="settings" title="Settings" icon={TabIcon} >
          <Scene key="settingsPage" component={Settings} renderBackButton={() => (null)} />
          <Scene key="editCustomerProfile" component={EditCustomerProfile} />
          <Scene key="editVendorProfile" component={EditVendorProfile} />
          <Scene key="changePasswordPage" component={ChangePassword} />
          <Scene key="termsOfUse" component={TermsOfUse} />
          <Scene key="privacyPolicy" component={PrivacyPolicy} />
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
    color: '#FFFFFF'
  }
};

export default RouterComponent;
