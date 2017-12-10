import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

//importing screens
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
import VendorList from './Containers/Home/VendorList';
import SelectSubcategory from './Containers/Home/SelectSubcategory';

import Settings from './Containers/Settings/Settings';
//end importing screens

import TabIcon from './Components/TabIcon';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth" initial navigationBarStyle={styles.authNavBarStyle}>
        <Scene
          key="landingPage"
          component={LandingPage}
          initial
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
          <Scene key="homeTab" component={HomePage} panHandlers={null} renderBackButton={() => (null)} />
          <Scene key="selectSubcategory" component={SelectSubcategory} />
          <Scene key="vendorList" component={VendorList} />
        </Scene>
        <Scene key="requests" title="Request" icon={TabIcon} >
          <Scene key="requestPage" component={LandingPage} />
        </Scene>

        <Scene key="settings" title="Settings" icon={TabIcon} >
          <Scene key="settingsPage" component={Settings} renderBackButton={() => (null)} />
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
