import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Input, Button, LoadingSpinner } from '../../Components/common';
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

  _renderLoginBtn() {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    return (
      <Button onPress={this._handleLoginUser}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.quicksandText}>
          Find the best service here in Aladdin
        </Text>

        <Input
          label="Email"
          placeholder="john@abc.com"
          onChangeText={this._handleEmailChanged}
          value={this.state.email}
        />

        <Input
          label="Password"
          placeholder="password"
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

      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading, errorMessage } = auth;

  return { loading, errorMessage };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //LEE: dispatching action here to all reducers and sagas, receiving at Sagas/Auth/login.js
    loginUser: (email, password) =>
      dispatch(ReduxActions.authLoginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);
