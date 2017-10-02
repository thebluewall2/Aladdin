import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage';
import UserLoginPage from './Containers/Auth/UserLoginPage';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="landingPage" component={LandingPage} initial />
        <Scene key="userLoginPage" component={UserLoginPage} />
      </Scene>
    </Router>
  );
}

export default RouterComponent;
