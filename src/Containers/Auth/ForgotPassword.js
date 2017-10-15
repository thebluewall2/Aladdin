import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

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
            errorMessage
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

  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <Text>Please enter your email</Text>

        <TextFieldComponent
          label={'Email'}
          onChangeText={this._handleResetPassword}
          value={this.state.email}
        />

        {this._renderErrorMessage}

        <TouchableOpacity>
          <Text>Reset password</Text>
        </TouchableOpacity>

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
      dispatch(ReduxActions.authResetPassword(email, userType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
