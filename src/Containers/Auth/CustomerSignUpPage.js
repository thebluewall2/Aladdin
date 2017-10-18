import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import { TextFieldComponent } from '../../Components/common';
import ReduxActions from '../../Redux/Actions';
import styles from './Styles';

class CustomerSignUpPage extends Component {

  constructor(props) {
      super(props);

      this.state = {
        name: '',
        password: '',
        phoneNo: '',
        address: '',
        email: '',
        checkedTerms: false,
        error: '',
      };
  }

  _onTermsOfUsePress = () => {
    Actions.TermsOfUsePage();
  }

  _onPrivacyPolicyPress = () => {
    Actions.PrivacyPolicyPage();
  }

  _handleNameChanged = (name) => {
    this.setState({
      name
    });
  }

  _handlePasswordChanged = (password) => {
    this.setState({
      password
    });
  }

  _handlePhoneNoChanged = (phoneNo) => {
    this.setState({
      phoneNo
    });
  }

  _handleAddressChanged = (address) => {
    this.setState({
      address
    });
  }

  _handleEmailChanged = (email) => {
    this.setState({
      email
    });
  }

  _handleCheckboxChecked = () => {
    this.setState({
      checkedTerms: !this.state.checkedTerms
    });
  }

  _handleSubmitSignUp = () => {
    if (!this.state.checkedTerms) {
      this.setState({
        error: 'Please agree to the terms and conditions before signing up.'
      });
    } else {
      const { name, password, phoneNo, address, email } = this.state;
      const { userType } = this.props;

      const newSignUp = {
        name,
        password,
        userType,
        phoneNo,
        address,
        email
      };

      this.props.signUpUser(newSignUp);
    }
  }

  render() {
    return (
      <View style={styles.signUpPageMainContainer}>
      <ScrollView>
        <Text style={styles.titleSignUpStyle}>
          Sign up!
        </Text>

        <TextFieldComponent
          label={"Name"}
          onChangeText={this._handleNameChanged}
          value={this.state.name}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Password"}
          secureTextEntry
          onChangeText={this._handlePasswordChanged}
          value={this.state.password}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Phone number"}
          onChangeText={this._handlePhoneNoChanged}
          value={this.state.phoneNo}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Address 1"}
          onChangeText={this._handleAddressChanged}
          value={this.state.address}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Address 2"}
          onChangeText={this._handleAddressChanged}
          value={this.state.address}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"City"}
          onChangeText={this._handleAddressChanged}
          value={this.state.address}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Postcode"}
          onChangeText={this._handleAddressChanged}
          value={this.state.address}
          componentStyle={styles.signUpTextFieldStyle}
        />

        <TextFieldComponent
          label={"Email"}
          onChangeText={this._handleEmailChanged}
          value={this.state.email}
          componentStyle={styles.signUpTextFieldStyle}
        />

          <Text style={styles.tAndCStyle}>
            By clicking the button below, you agree to our  and Privacy Policy.
          </Text>

        <View style={styles.signUpButtonStyle}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSubmitSignUp}>
            <Text style={styles.buttonTextStyle}> Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-between', paddingTop: 15 }}>
          <View style={{ bottom: 0, left: 10, right: 10, flexDirection: 'row' }} >
            <TouchableOpacity onPress={this._onTermsOfUsePress}>
                <Text style={styles.tAndCLinkStyle}>Terms of Use</Text>
            </TouchableOpacity>
          </View>

          <View style={{ bottom: 0, right: 0, flexDirection: 'row' }} >
            <TouchableOpacity onPress={this._onPrivacyPolicyPress}>
                <Text style={styles.tAndCLinkStyle}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
      dispatch(ReduxActions.authSignUpAttempt(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignUpPage);
