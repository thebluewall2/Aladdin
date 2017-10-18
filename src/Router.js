import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage';
import LoginPage from './Containers/Auth/LoginPage';
import SignUpPage from './Containers/Auth/SignUpPage';
import HomePage from './Containers/Home/HomePage';

const RouterComponent = () => {
  return (
    <Router>
          <Scene key="landingPage" component={LandingPage} initial hideNavBar />
          <Scene
            key="userLoginPage"
            component={LoginPage}
            hideNavBar={false}
            titleStyle={styles.titleStyle} title={'E - R E N O'}
          />
          <Scene key="signUpPage" component={SignUpPage} title={"Sign up"} />

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
