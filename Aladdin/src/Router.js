import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage';
import UserLoginPage from './Containers/Auth/UserLoginPage';
import HomePage from './Containers/Home/HomePage';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="auth">
          <Scene key="landingPage" component={LandingPage} initial />
          <Scene key="userLoginPage" component={UserLoginPage} title={"Login"} />
        </Scene>

        <Scene key="home">
          <Scene key="homePage" component={HomePage} initial />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
