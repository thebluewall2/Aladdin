import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { TextFieldComponent } from '../../Components/common';

import ReduxActions from '../../Redux/Actions';

class ChangePassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorMsg: '',
      successMsg: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { errorMsg, successMsg } = nextProps;

    if (errorMsg !== this.state.errorMsg) {
      this.setState({
        errorMsg
      });
    }

    if (successMsg !== this.state.successMsg) {
      this.setState({
        successMsg
      });
    }
  }

  _handleTextChanged = (text, property) => {
    this.setState({
      [property]: text
    });
  }

  _onSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state;

    this._handleErrorMsg('');
    this._resetSuccessMsg();

    if (!oldPassword || !newPassword || !confirmPassword) {
      this._handleErrorMsg("Invalid password entered");
      return;
    }

    if (newPassword !== confirmPassword) {
      this._handleErrorMsg("Passwords do not match");
      return;
    }

    this.props.changePassword(oldPassword, newPassword);
  }

  _handleErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
  }

  _resetSuccessMsg = () => {
    this.setState({
      successMsg: ''
    });
  }

  render() {
    return (
      <View style={{ paddingTop: 80 }}>

        <TextFieldComponent
          label={"Old password"}
          secureTextEntry
          onChangeText={(text) => {
            this._handleTextChanged(text, "oldPassword");
          }}
          value={this.state.oldPassword}
        />

        <TextFieldComponent
          label={"New password"}
          secureTextEntry
          onChangeText={(text) => {
            this._handleTextChanged(text, "newPassword");
          }}
          value={this.state.newPassword}
        />

        <TextFieldComponent
          label={"Confirm password"}
          secureTextEntry
          onChangeText={(text) => {
            this._handleTextChanged(text, "confirmPassword");
          }}
          value={this.state.confirmPassword}
        />

        <Text>{this.state.errorMsg}</Text>
        <Text>{this.state.successMsg}</Text>

        <TouchableOpacity onPress={this._onSubmit}>
          <Text>Change password</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    errorMsg: settings.errorMsg,
    successMsg: settings.successMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (oldPassword, newPassword) =>
      dispatch(ReduxActions.settingsChangePasswordAttempt(oldPassword, newPassword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
