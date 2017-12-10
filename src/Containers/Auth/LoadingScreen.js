import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './Styles';
import ReduxActions from '../../Redux/Actions';

class LoadingScreen extends Component {


  componentWillMount() {
    this.props.appStartUp(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startingUp === false && !nextProps.userData) {
      Actions.landingPage();
    }
  }

  render() {
    return (
      <View style={{ paddingTop: 80, paddingLeft: 15 }}>
        <Text>Loading screen</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { startingUp, userData } = auth;

  return { startingUp, userData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appStartUp: (startingUp) =>
      dispatch(ReduxActions.authAppStartUp(startingUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
