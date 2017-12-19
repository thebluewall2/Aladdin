import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextFieldComponent } from '../../../Components/common';
import ReduxActions from '../../../Redux/Actions';
import styles from '../Styles';

class CustomerSignUpPage extends Component {

  constructor(props) {
      super(props);

      this.state = {
        name: '',
        password: '',
        confirmPassword: '',
        phoneNo: '',
        address1: '',
        address2: '',
        postcode: '',
        city: '',
        state: '',
        email: '',
        error: '',
      };
  }

  _navToTermsOfUse = () => {
    Actions.termsOfUse();
  }

  _navToPrivacyPolicy = () => {
    Actions.privacyPolicy();
  }

  _handleTextChanged = (text, property) => {
    this.setState({
      [property]: text
    });
  }

  _setErrorMessage = (error) => {
    this.setState({
      error
    });
  }

  _handleSubmitSignUp = () => {
    const { name, password, confirmPassword, phoneNo, address1, address2, city, postcode, state, email } = this.state;
    const { userType } = this.props;

    //resets error msg if any
    this._setErrorMessage('');

    if (password !== confirmPassword) {
      this._setErrorMessage('Passwords do not match');
    } else {
      //only if password matches, then sign up
      const newSignUp = {
        name,
        password,
        userType,
        phoneNo,
        address: address1.concat(" ").concat(address2),
        city,
        postcode,
        state,
        email
      };
      
      this.props.signUpUser(newSignUp);
    }
  }

  render() {
    return (
      <View style={styles.signUpPageMainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={false}
      >
        <Text style={styles.titleSignUpStyle}>
          Sign up!
        </Text>

        <TextFieldComponent
          label={"Name"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'name');
          }}
          value={this.state.name}
          componentStyle={styles.signUpTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"Password"}
          secureTextEntry
          onChangeText={(text) => {
            this._handleTextChanged(text, 'password');
          }}
          value={this.state.password}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Confirm password"}
          secureTextEntry
          onChangeText={(text) => {
            this._handleTextChanged(text, 'confirmPassword');
          }}
          value={this.state.confirmPassword}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Phone number"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'phoneNo');
          }}
          value={this.state.phoneNo}
          componentStyle={styles.signUpTextFieldStyle}
          keyboardType={"phone-pad"}
        />

        <TextFieldComponent
          label={"Address 1"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'address1');
          }}
          value={this.state.address1}
          componentStyle={styles.signUpTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"Address 2"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'address2');
          }}
          value={this.state.address2}
          componentStyle={styles.signUpTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"City"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'city');
          }}
          value={this.state.city}
          componentStyle={styles.signUpTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"Postcode"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'postcode');
          }}
          value={this.state.postcode}
          componentStyle={styles.signUpTextFieldStyle}
          keyboardType={"numeric"}
        />

        <TextFieldComponent
          label={"State"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'state');
          }}
          value={this.state.state}
          componentStyle={styles.signUpTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"Email"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'email');
          }}
          value={this.state.email}
          componentStyle={styles.signUpTextFieldStyle}
          keyboardType={"email-address"}
          autoCorrect={false}
        />

          <Text style={styles.tAndCStyle}>
            By clicking the button below, you agree to our Terms of Use and Privacy Policy.
          </Text>

          <Text style={[styles.errorMessageStyle, { paddingTop: 5 }]}>
              {this.state.error}
          </Text>

        <View style={styles.signUpButtonStyle}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSubmitSignUp}>
            <Text style={styles.buttonTextStyle}> Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-between', paddingTop: 15 }}>
          <View style={{ bottom: 0, left: 10, right: 10, flexDirection: 'row' }} >
            <TouchableOpacity onPress={this._navToTermsOfUse}>
                <Text style={styles.tAndCLinkStyle}>Terms of Use</Text>
            </TouchableOpacity>
          </View>

          <View style={{ bottom: 0, right: 0, flexDirection: 'row' }} >
            <TouchableOpacity onPress={this._navToPrivacyPolicy}>
                <Text style={styles.tAndCLinkStyle}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { userType } = auth;

  return {
    userType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (userData) =>
      dispatch(ReduxActions.authUserSignUpAttempt(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignUpPage);
