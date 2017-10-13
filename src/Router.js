import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LandingPage from './Containers/Auth/LandingPage';
import UserLoginPage from './Containers/Auth/UserLoginPage';
import HomePage from './Containers/Home/HomePage';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="auth" navigationBarStyle={styles.authNavBarStyle} >
          <Scene key="landingPage" component={LandingPage} initial hideNavBar ={true} />

          <Scene
            key="userLoginPage"
            component={UserLoginPage}
            hideNavBar = {false}
            titleStyle={styles.titleStyle} title={'E - R E N O'}/>

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

  titleStyle:{
    color: '#FFFFFF'
  }
};


export default RouterComponent;
