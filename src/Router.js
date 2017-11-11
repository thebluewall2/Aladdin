import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage';
import LoginPage from './Containers/Auth/LoginPage';
import TermsOfUse from './Containers/Auth/TermsOfUse';
import PrivacyPolicy from './Containers/Auth/PrivacyPolicy';
import CustomerSignUpPage from './Containers/Auth/SignUp/CustomerSignUpPage';
import VendorSignUpPage from './Containers/Auth/SignUp/VendorSignUpPage';
import VendorSelectCategories from './Containers/Auth/SignUp/VendorSelectCategories';
import VendorSelectSubcategories from './Containers/Auth/SignUp/VendorSelectSubcategories';
import ForgotPassword from './Containers/Auth/ForgotPassword';
import HomePage from './Containers/Home/HomePage';
import VendorList from './Containers/Home/VendorList';
import SelectSubcategory from './Containers/Home/SelectSubcategory';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth" navigationBarStyle={styles.authNavBarStyle}>
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
        <Scene
          key="termsOfUse"
          component={TermsOfUse}
        />
        <Scene
          key="privacyPolicy"
          component={PrivacyPolicy}
        />
      </Scene>

      <Scene key="home" navigationBarStyle={styles.authNavBarStyle}>
        <Scene
          key="homePage"
          component={HomePage}
          titleStyle={styles.titleStyle}
          title={'E - R E N O'}
          initial
        />
        <Scene
          key="vendorList"
          component={VendorList}
        />
        <Scene
          key="selectSubcategory"
          component={SelectSubcategory}
        />
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
