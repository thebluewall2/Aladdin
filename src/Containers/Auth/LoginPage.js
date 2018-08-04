 import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LoadingSpinner, Checkbox } from '../../Components/common';
import ReduxActions from '../../Redux/Actions';
import styles from './Styles';

class UserLoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rememberMe: true,
    };
  }

  _handleLoginUser = () => {
    const { userType, email, password } = this.props;
    const { rememberMe } = this.state;

    const isFromLoginPage = true;

    this.props.loginUser(userType, email, password, isFromLoginPage, rememberMe);
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
      return (
        <View style={{ height: 40, width: 40, paddingVertical: 30 }}>
          <LoadingSpinner />
        </View>
      );
    }

    return (
      <View style={{ paddingTop: 20, paddingBottom: 20, width: '80%' }}>
        <TouchableOpacity style={styles.loginButtonStyle} onPress={this._handleLoginUser} >
          <Text style={styles.buttonTextStyle}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }

  _toggleCheckbox = () => {
    this.setState({
      rememberMe: !this.state.rememberMe,
    });
  }

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/pictures/backgroundImage.png')}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.loginPageMainContainer}
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: 'center', paddingTop: 50 }}>
            <Image
              source={require('../../../assets/pictures/ERenoLogo.png')}
              style={styles.iconStyle}
              resizeMode="contain"
            />

            <Image
              source={require('../../../assets/pictures/eRenoTextIcon.png')}
              style={{ height: 100, width: 100, marginTop: -20 }}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textInputViewStyle} >
            <View style={styles.loginIconTextInputViewStyle}>
              <Ionicons name="md-person" style={{ fontSize: 14, color: '#707588' }} />
            </View>

            <TextInput
              label="Email"
              onChangeText={this._handleEmailChanged}
              value={this.props.email}
              placeholder="Username"
              placeholderTextColor="#707588"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              onSubmitEditing={() => this.focusNextField('password')}
              style={styles.loginPageTextInputStyle}
            />
          </View>

          <View style={styles.textInputViewStyle} >
            <View style={styles.loginIconTextInputViewStyle}>
              <Ionicons name="md-lock" style={{ fontSize: 14, color: '#707588' }} />
            </View>

            <TextInput
              ref="password"
              label={"Password"}
              placeholder="Password"
              placeholderTextColor="#707588"
              secureTextEntry
              onChangeText={this._handlePasswordChanged}
              value={this.props.password}
              onSubmitEditing={this._handleLoginUser}
              style={styles.loginPageTextInputStyle}
            />
          </View>


          {this.props.errorMessage !== "" ? (
            <View>
              <Text style={styles.errorMessageStyle}>{this.props.errorMessage.message}</Text>
            </View>
          ) :
            false
          }

          {this._renderLoginBtn()}

          <View style={styles.forgetPasswordContainerStyle} >
            <TouchableOpacity onPress={this._toggleCheckbox}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Checkbox isChecked={this.state.rememberMe} toggleCheck={this._toggleCheckbox} />

                <Text style={[styles.linkForgetPasswordStyle, { paddingLeft: 5 }]}>
                  Remember me
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._navToForgetPassword}>
              <View>
                <Text style={[styles.linkForgetPasswordStyle, { fontStyle: 'italic' }]}>
                  Forget Password?
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={this._navToSignUp} style={{ paddingTop: 30 }}>
            <View>
              <Text style={styles.linkForgetPasswordStyle}>
                New User? Sign Up now!
              </Text>
            </View>
          </TouchableOpacity>

        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading, errorMessage, userType, email, password } = auth;

  return { loading, errorMessage, userType, email, password };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userType, email, password, isFromLoginPage, rememberMe) =>
      dispatch(ReduxActions.authLoginUser(userType, email, password, isFromLoginPage, rememberMe)),
    emailChanged: (email) =>
      dispatch(ReduxActions.authEmailChanged(email)),
    passwordChanged: (password) =>
      dispatch(ReduxActions.authPasswordChanged(password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);
