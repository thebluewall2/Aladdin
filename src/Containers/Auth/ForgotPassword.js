import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles';


import { TextFieldComponent } from '../../Components/common/TextFieldComponent';

import ReduxActions from '../../Redux/Actions';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  _renderErrorMessage = () => {
    const { errorMessage } = this.props;

    if (errorMessage) {
      return (
          //LOUISA: error message goes here
          <Text style={{ color: "red" }}>
            {errorMessage}
          </Text>
      );
    }
    return false;
  }

  _handleResetPassword = () => {
    const { userType } = this.props;
    const { email } = this.state;

    this.props.resetPassword(email, userType);
  }

  _handleTextChanged = (email) => {
    this.setState({
      email
    });
  }

  render() {
    return (
      <View style={styles.loginPageMainContainer}>
        <Image
          source={require('../../../assets/pictures/ERenoLogo.png')}
          style={styles.buttonImage}
        />

        <Text style={styles.quicksandSubTitle}>
          Forgot Password?
        </Text>

        <Text style={styles.quicksandTextDescription}>
          Please enter your registered email address.
          Password reset instruction will be sent to your mailbox.
        </Text>

        <TextFieldComponent
          label={'Email'}
          onChangeText={text => this._handleTextChanged(text)}
          value={this.state.email}
        />

        {this._renderErrorMessage()}

        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this._handleResetPassword} >
            <Text style={styles.buttonTextStyle}>Reset Password</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { userType, loading, errorMessage } = auth;

  return { userType, loading, errorMessage };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email, userType) =>
      dispatch(ReduxActions.authResetPasswordAttempt(email, userType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
