import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { TextFieldComponent, LoadingSpinner } from '../../Components/common';
import ReduxActions from '../../Redux/Actions';
import styles from './Styles';

class UserLoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  _handleLoginUser = () => {
    const { email, password } = this.state;

    this.props.loginUser(email, password);
  }

  _handleEmailChanged = (text) => {
    this.setState({ email: text });
  }

  _handlePasswordChanged = (text) => {
    this.setState({ password: text });
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
      <View style={{ paddingTop: 20 }}>
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
          style={styles.buttonImage}
        />

        <Text style={styles.quicksandTextSlogan}>
          Find the best service here in Aladdin
        </Text>

        <TextFieldComponent
          label={'Email'}
          onChangeText={this._handleEmailChanged}
          value={this.state.email}
        />

        <TextFieldComponent
          label={"Password"}
          secureTextEntry
          onChangeText={this._handlePasswordChanged}
          value={this.state.password}
        />

        {/**LOUISA: error message goes here**/}
        {this.props.errorMessage !== "" ? (
          <View>
            <Text style={{ color: 'red' }}>{this.props.errorMessage.message}</Text>
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
  const { loading, errorMessage, userType } = auth;

  return { loading, errorMessage, userType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //LEE: dispatching action here to all reducers and sagas, receiving at Sagas/Auth/login.js
    loginUser: (email, password) =>
      dispatch(ReduxActions.authLoginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);
