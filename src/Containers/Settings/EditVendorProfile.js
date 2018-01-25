import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextFieldComponent, LoadingSpinner } from '../../Components/common';
import styles from './Styles';

class EditVendorProfile extends React.PureComponent {

  _handleTextChanged = (text, property) => {
    this.setState({
      [property]: text
    });
  }

  render() {
    return (
      <View style={styles.editProfileContainerStyle}>
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
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditVendorProfile);
