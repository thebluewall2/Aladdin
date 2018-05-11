import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextFieldComponent, LoadingSpinner } from '../../../Components/common';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage !== this.state.error) {
      this._setErrorMessage(nextProps.errorMessage);
    }
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
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

  _renderSignUpBtn = () => {
    const { loading } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.signUpButtonStyle}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSubmitSignUp}>
          <Text style={styles.buttonTextStyle}> Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleSubmitSignUp = () => {
    const {
      name,
      password,
      confirmPassword,
      phoneNo,
      address1,
      address2,
      city,
      postcode,
      state,
      email
    } = this.state;

    const { userType } = this.props;

    //resets error msg if any
    this._setErrorMessage('');

    if (!name || !password || !confirmPassword || !phoneNo || !address1 || !address2 || !city || !postcode || !state || !email) {
      this._setErrorMessage('Please fill up all fields');
      return;
    }

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
            componentStyle={styles.textFieldStyle}
            autoCorrect={false}
            onSubmitEditing={() => this.focusNextField('password')}
          />

          <TextFieldComponent
            ref="password"
            label={"Password"}
            secureTextEntry
            onChangeText={(text) => {
              this._handleTextChanged(text, 'password');
            }}
            value={this.state.password}
            componentStyle={styles.signUpTextFieldStyle}
            onSubmitEditing={() => this.focusNextField('confirmPassword')}
          />

          <TextFieldComponent
            ref="confirmPassword"
            label={"Confirm password"}
            secureTextEntry
            onChangeText={(text) => {
              this._handleTextChanged(text, 'confirmPassword');
            }}
            value={this.state.confirmPassword}
            componentStyle={styles.signUpTextFieldStyle}
            onSubmitEditing={() => this.focusNextField('phoneNo')}
          />

          <TextFieldComponent
            ref="phoneNo"
            label={"Phone number"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'phoneNo');
            }}
            value={this.state.phoneNo}
            componentStyle={styles.signUpTextFieldStyle}
            keyboardType={"phone-pad"}
            onSubmitEditing={() => this.focusNextField('address1')}
          />

          <TextFieldComponent
            ref="address1"
            label={"Address 1"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'address1');
            }}
            value={this.state.address1}
            componentStyle={styles.signUpTextFieldStyle}
            autoCorrect={false}
            onSubmitEditing={() => this.focusNextField('address2')}
          />

          <TextFieldComponent
            ref="address2"
            label={"Address 2"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'address2');
            }}
            value={this.state.address2}
            componentStyle={styles.signUpTextFieldStyle}
            autoCorrect={false}
            onSubmitEditing={() => this.focusNextField('city')}
          />

          <TextFieldComponent
            ref="city"
            label={"City"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'city');
            }}
            value={this.state.city}
            componentStyle={styles.signUpTextFieldStyle}
            autoCorrect={false}
            onSubmitEditing={() => this.focusNextField('postcode')}
          />

          <TextFieldComponent
            ref="postcode"
            label={"Postcode"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'postcode');
            }}
            value={this.state.postcode}
            componentStyle={styles.signUpTextFieldStyle}
            keyboardType={"numeric"}
            onSubmitEditing={() => this.focusNextField('state')}
          />

          <TextFieldComponent
            ref="state"
            label={"State"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'state');
            }}
            value={this.state.state}
            componentStyle={styles.signUpTextFieldStyle}
            autoCorrect={false}
            onSubmitEditing={() => this.focusNextField('email')}
          />

          <TextFieldComponent
            ref="email"
            label={"Email"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'email');
            }}
            value={this.state.email}
            componentStyle={styles.signUpTextFieldStyle}
            keyboardType={"email-address"}
            autoCorrect={false}
            onSubmitEditing={this._handleSubmitSignUp}
          />

            <Text style={styles.tAndCStyle}>
              By clicking the button below, you agree to our Terms of Use and Privacy Policy.
            </Text>

            <Text style={[styles.errorMessageStyle, { paddingTop: 10 }]}>
                {this.state.error}
            </Text>

            {this._renderSignUpBtn()}

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
  const { userType, loading, errorMessage } = auth;

  return {
    userType,
    loading,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (userData) =>
      dispatch(ReduxActions.authUserSignUpAttempt(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignUpPage);
