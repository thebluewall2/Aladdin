import React, { Component } from 'react';
import { View, Picker, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextFieldComponent } from '../../Components/common';
import ReduxActions from '../../Redux/Actions';
import styles from './Styles';

class VendorSignUpPage extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      companyName: '',
      name: '',
      phoneNo: '',
      officeNo: '',
      addressLineOne: '',
      addressLineTwo: '',
      postcode: '',
      city: '',
      pickerSelected: false,
      category: 'Services Categories',
    };
  }

  _handleTextChanged = (text, property) => {
    this.setState({
      [property]: text
    });
  }

  _renderPicker = (property) => {
    if (this.state.pickerSelected === property) {
      return (
        <Picker>
          <Picker.Item label="Hi" />
          <Picker.Item label="hello" />
        </Picker>
      );
    }
    return false;
  }

  _handlePickerPressed = (property) => {
    this.setState({
      pickerSelected: property
    });
  }


  render() {
    return (
      <View style={styles.signUpPageMainContainer}>
        <KeyboardAwareScrollView>
          <View>
            <Text style={styles.titleSignUpStyle}>
              Sign up!
            </Text>
            <TextFieldComponent
              label={"Company name"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'companyName');
              }}
              value={this.state.companyName}
            />

            <TextFieldComponent
              label={"Name"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'name');
              }}
              value={this.state.name}
            />

            <TextFieldComponent
              label={"Phone number"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'phoneNo');
              }}
              value={this.state.phoneNo}
            />

            <TextFieldComponent
              label={"Office number"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'officeNo');
              }}
              value={this.state.officeNo}
            />

            <TextFieldComponent
              label={"Address 1"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'addressOne');
              }}
              value={this.state.addressOne}
            />

            <TextFieldComponent
              label={"Address 2"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'addressTwo');
              }}
              value={this.state.addressTwo}
            />

            <TextFieldComponent
              label={"Postcode"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'postcode');
              }}
              value={this.state.postcode}
            />

            <TextFieldComponent
              label={"City"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'city');
              }}
              value={this.state.postcode}
            />

            <TouchableOpacity onPress={() => this._handlePickerPressed('category')}>
              <Text style={styles.linkStyleServiceProvider}> Services Category </Text>
            </TouchableOpacity>

            {this._renderPicker('category')}

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

export default connect(mapStateToProps, mapDispatchToProps)(VendorSignUpPage);
