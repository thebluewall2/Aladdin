 import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { TextFieldComponent, LoadingSpinner } from '../../Components/common';
import ReduxActions from '../../Redux/Actions';
import styles from './Styles';

class UserLoginPage extends Component {

  _handleLoginUser = () => {
    const { userType, email, password } = this.props;

    this.props.loginUser(userType, email, password);
  }

  _handleEmailChanged = (text) => {
    this.props.emailChanged(text);
  }

  _handlePasswordChanged = (text) => {
    this.props.passwordChanged(text);
  }

  _navToSignUp = () => {
    const { userType } = this.props;

    if (userType === 'customer') {
      Actions.customerSignUpPage();
    } else if (userType === 'vendor') {
      Actions.vendorSignUpPage();
    }
  }

  _navToForgetPassword = () => {
    Actions.forgotPassword();
  }

  _renderLoginBtn() {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={{ paddingTop: 20, paddingBottom: 20 }}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this._handleLoginUser} >
          <Text style={styles.buttonTextStyle}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.loginPageMainContainer}>
        <Image
          source={require('../../../assets/pictures/ERenoLogo.png')}
          style={styles.iconStyle}
        />

        <Text style={styles.quicksandTextSlogan}>
          Find the best service here in e Reno
        </Text>

        <TextFieldComponent
          label={'Email'}
          onChangeText={this._handleEmailChanged}
          value={this.props.email}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"Password"}
          secureTextEntry
          onChangeText={this._handlePasswordChanged}
          value={this.props.password}
        />

        {this.props.errorMessage !== "" ? (
          <View>
            <Text style={styles.errorMessageStyle}>{this.props.errorMessage.message}</Text>
          </View>
        ) :
          false
        }

        {this._renderLoginBtn()}

        <TouchableOpacity onPress={this._navToForgetPassword}>
          <View>
            <Text style={styles.linkStyleForgetPassword}>
              Forget Password?
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._navToSignUp}>
          <View>
            <Text style={styles.linkStyleSignUpNow}>
              New User? Sign Up now!
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading, errorMessage, userType, email, password } = auth;

  return { loading, errorMessage, userType, email, password };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //LEE: dispatching action here to all reducers and sagas, receiving at Sagas/Auth/login.js
    loginUser: (userType, email, password) =>
      dispatch(ReduxActions.authLoginUser(userType, email, password)),
    emailChanged: (email) =>
      dispatch(ReduxActions.authEmailChanged(email)),
    passwordChanged: (password) =>
      dispatch(ReduxActions.authPasswordChanged(password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);
