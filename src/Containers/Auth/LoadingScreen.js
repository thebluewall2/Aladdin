import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
        source={require('../../../assets/pictures/ERenoLogo.png')}
        style={styles.iconStyle}
        />
        <Text style={{ fontFamily: 'Quicksand-regular', fontSize: 16, textAlign: 'center' }}> {'\n'} Diversified services. Unvarying quality. </Text>
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
