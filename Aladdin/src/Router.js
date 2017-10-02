import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage.js';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="landingPage" component={LandingPage} initial />
      </Scene>
    </Router>
  );
}

export default RouterComponent;
