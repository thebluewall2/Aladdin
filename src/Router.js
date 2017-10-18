import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage';
import LoginPage from './Containers/Auth/LoginPage';
import CustomerSignUpPage from './Containers/Auth/CustomerSignUpPage';
import VendorSignUpPage from './Containers/Auth/VendorSignUpPage';
import ForgotPassword from './Containers/Auth/ForgotPassword';
import HomePage from './Containers/Home/HomePage';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="landingPage" component={LandingPage} initial hideNavBar />
        <Scene
          key="userLoginPage"
          component={LoginPage}
          hideNavBar={false}
          titleStyle={styles.titleStyle} title={'E - R E N O'}
        />
        <Scene key="customerSignUpPage" component={CustomerSignUpPage} title={'Sign up'} />
        <Scene key="vendorSignUpPage" component={VendorSignUpPage} title={'Sign up'} />
        <Scene key="forgotPassword" component={ForgotPassword} title={'Reset password'} />
      </Scene>

      <Scene key="home">
        <Scene key="homePage" component={HomePage} initial />
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
