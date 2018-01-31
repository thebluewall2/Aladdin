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
import MakePayment from './Containers/Requests/MakePayment';
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
          navigationBarStyle={styles.authNavBarStyle}
          titleStyle={styles.titleStyle} title={'E - R E N O'}
        />
        <Scene
          key="customerSignUpPage"
          component={CustomerSignUpPage}
          navigationBarStyle={styles.authNavBarStyle}
          titleStyle={styles.titleStyle} title={'Sign up'}
        />
        <Scene
          key="vendorSignUpPage"
          component={VendorSignUpPage}
          navigationBarStyle={styles.authNavBarStyle}
          titleStyle={styles.titleStyle} title={'Sign up'}
        />
        <Scene
          key="forgotPassword"
          component={ForgotPassword}
          navigationBarStyle={styles.authNavBarStyle}
          titleStyle={styles.titleStyle} title={'Reset password'}
        />
        <Scene
          key="selectCategories"
          component={VendorSelectCategories}
          navigationBarStyle={styles.authNavBarStyle}
          titleStyle={styles.titleStyle} title={'Select categories'}
        />
        <Scene
          key="selectSubcategories"
          component={VendorSelectSubcategories}
          navigationBarStyle={styles.authNavBarStyle}
          titleStyle={styles.titleStyle} title={'Select subcategories'}
        />
      </Scene>

      <Scene key="home" tabs >
        <Scene key="homePage" title="Home" icon={TabIcon} >
          <Scene key="homeTab" component={HomePage} hideNavBar />
          <Scene
            key="selectSubcategory"
            component={SelectSubcategory}
            hideNavBar={false}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Select subcategories'}
          />
          <Scene
            key="selectAddress"
            component={SelectAddress}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Select address'}
          />
          <Scene
            key="addNewAddress"
            component={AddNewAddress}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Add New Address'}
          />
          <Scene
            key="vendorList"
            component={VendorList}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Choose a Vendor'}
          />
          <Scene
            key="vendorDataPage"
            component={VendorData}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Vendor Details'}
          />
          <Scene
            key="chooseTime"
            component={ChooseTimeForService}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Choose Time'}
          />
        </Scene>

        <Scene key="requests" title="Request" icon={TabIcon} >
<<<<<<< .merge_file_96wU2I
          <Scene key="requestPage" component={RequestsHome} renderBackButton={() => (null)} />
          <Scene key="customerRequestDetails" component={CustomerRequestDetails} />
          <Scene key="makePayment" component={MakePayment} />
          <Scene key="qrCodePage" component={QRCodePage} />
          <Scene key="vendorRequestDetails" component={VendorRequestDetails} />
          <Scene key="vendorSelectTime" component={VendorSelectTime} />
          <Scene key="qrScannerPage" component={QRScanner} />
          <Scene key="createReview" component={CreateReview} />
=======
          <Scene
            key="requestPage"
            component={RequestsHome}
            renderBackButton={() => (null)}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Requests'}
          />
          <Scene
            key="customerRequestDetails"
            component={CustomerRequestDetails}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Request Details'}
          />
          <Scene
            key="qrCodePage"
            component={QRCodePage}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Complete Service'}
          />
          <Scene
            key="vendorRequestDetails"
            component={VendorRequestDetails}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Request Details'}
          />
          <Scene
            key="vendorSelectTime"
            component={VendorSelectTime}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Select Time'}
          />
          <Scene
            key="qrScannerPage" 
            component={QRScanner}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Complete Service'}
          />
>>>>>>> .merge_file_a4z3x7
        </Scene>

        <Scene key="settings" title="Settings" icon={TabIcon} >
          <Scene
            key="settingsPage"
            component={Settings}
            renderBackButton={() => (null)}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Settings'}
          />
          <Scene
            key="editCustomerProfile"
            component={EditCustomerProfile}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Edit Profile'}
          />
          <Scene
            key="editVendorProfile"
            component={EditVendorProfile}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Edit Profile'}
          />
          <Scene
            key="changePasswordPage"
            component={ChangePassword}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Change Password'}
          />
          <Scene
            key="termsOfUse"
            component={TermsOfUse}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Terms of Use'}
          />
          <Scene
            key="privacyPolicy"
            component={PrivacyPolicy}
            navigationBarStyle={styles.authNavBarStyle}
            titleStyle={styles.titleStyle}
            title={'Privacy Policy'}
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

export default RouterComponent;
