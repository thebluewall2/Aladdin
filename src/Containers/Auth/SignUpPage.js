import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { TextFieldComponent } from '../../Components/common';
import ReduxActions from '../../Redux/Actions';

class SignUpPage extends Component {

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
      <View>
        <Text style={{ paddingTop: 100 }}>
          Sign up!
        </Text>

        <TextFieldComponent
          label={"Name"}
          onChangeText={this._handleNameChanged}
          value={this.state.name}
        />

        <TextFieldComponent
          label={"Password"}
          secureTextEntry
          onChangeText={this._handlePasswordChanged}
          value={this.state.password}
        />

        <TextFieldComponent
          label={"Phone number"}
          onChangeText={this._handlePhoneNoChanged}
          value={this.state.phoneNo}
        />

        <TextFieldComponent
          label={"Address"}
          onChangeText={this._handleAddressChanged}
          value={this.state.address}
        />

        <TextFieldComponent
          label={"Email"}
          onChangeText={this._handleEmailChanged}
          value={this.state.email}
        />

        {/**LOUISA : this is a checkbox, but I'm temporarily using a button**/}
        <TouchableOpacity onPress={this._handleCheckboxChecked}>
          <Text>I agree to your terms.</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={this._handleSubmitSignUp}>
          <Text>Sign up!</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
