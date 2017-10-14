import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './Styles';
import ReduxActions from '../../Redux/Actions';

class LandingPage extends Component {

  _onVendorPressed = () => {
    this.props.setUserType('vendor');
    Actions.loginPage();
  }

  _onCustomerPressed = () => {
    this.props.setUserType('user');
    Actions.loginPage();
  }

  render() {
    return (

      <View style={styles.landingPageMainContainer}>
        <Text style={styles.quicksandTitle}>
          Are you a..
        </Text>

        <TouchableOpacity onPress={this._onVendorPressed}>
          <View style={styles.vendorCircle}>
            <Image
              source={require('../../../assets/pictures/Vendor.png')}
              style={styles.buttonImage}
            />
          </View>
          <Text style={styles.buttonCaption}>VENDOR</Text>
        </TouchableOpacity>

        <Text style={styles.quicksandItalic}>
          Or...
        </Text>

        <TouchableOpacity onPress={this._onCustomerPressed}>
          <View style={styles.customerCircle}>
            <Image
              source={require('../../../assets/pictures/Customer.png')}
              style={styles.buttonImage}
            />
          </View>
          <Text style={styles.buttonCaption}>USER</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { userType } = auth;

  return { userType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserType: (userType) =>
      dispatch(ReduxActions.authSetUserType(userType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
