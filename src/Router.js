import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage';
import UserLoginPage from './Containers/Auth/UserLoginPage';
import SignUpPage from './Containers/Auth/SignUpPage';
import HomePage from './Containers/Home/HomePage';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="auth">
          <Scene key="landingPage" component={LandingPage} hideNavBar initial />
          <Scene key="userLoginPage" component={UserLoginPage} hideNavBar={false} title={"Login"} />
          <Scene key="signUpPage" component={SignUpPage} title={"Sign up"} />
        </Scene>

        <Scene key="home">
          <Scene key="homePage" component={HomePage} initial />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
