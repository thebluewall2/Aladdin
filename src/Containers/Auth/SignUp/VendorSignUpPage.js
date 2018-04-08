import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalPicker from 'react-native-modal-picker';
import { Actions } from 'react-native-router-flux';

import { TextFieldComponent } from '../../../Components/common';
import ReduxActions from '../../../Redux/Actions';
import styles from '../Styles';

class VendorSignUpPage extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      userType: 'vendor',
      companyName: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNo: '',
      officeNo: '',
      addressOne: '',
      addressTwo: '',
      postcode: '',
      city: '',
      state: '',
      yearsOfExp: 0,
      yearsOfCompany: 0,
      noOfStaff: 0,
      awards: '',
      error: '',
    };
  }

  componentDidMount() {
    //get service categories from firebase while user fills up the sign up form
    this.props.getServiceCategories();
  }

  getYearsOfExperienceData = () => {
    let index = 0;

    const data = [
      { key: index++, label: '0-2 years' },
      { key: index++, label: '3-5 years' },
      { key: index++, label: '5-7 years' },
      { key: index++, label: '7+ years' }
    ];
    return data;
  }

  getYearsOfCompanyData = () => {
    let index = 0;

    const data = [
      { key: index++, label: '0-2 years' },
      { key: index++, label: '3-5 years' },
      { key: index++, label: '5-7 years' },
      { key: index++, label: '7+ years' }
    ];
    return data;
  }

  getNoOfStaffData = () => {
    let index = 0;

    const data = [
      { key: index++, label: '1-10' },
      { key: index++, label: '11-20' },
      { key: index++, label: '21-50' },
      { key: index++, label: '50+' }
    ];
    return data;
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

  _handleSelectCategories = () => {
    const data = this.state;

    if (!data.addressOne || !data.addressTwo || !data.awards || !data.city || !data.companyName
      || !data.confirmPassword || !data.email || !data.name || !data.noOfStaff || !data.officeNo
      || !data.password || !data.phoneNo || !data.postcode || !data.state || !data.yearsOfCompany
      || !data.yearsOfExp) {
        this._setErrorMessage('Please fill up all fields');
    } else {
      this._setErrorMessage('');

      if (data.password !== data.confirmPassword) {
        this._setErrorMessage('Passwords do not match');
      } else {
        this.props.setVendorData(data);

        Actions.selectCategories();
      }
    }
  }

  render() {
    const yearsOfExpData = this.getYearsOfExperienceData();
    const yearsOfCompanyData = this.getYearsOfCompanyData();
    const noOfStaffData = this.getNoOfStaffData();

    return (
      <View style={styles.signUpPageMainContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableResetScrollToCoords={false}
        >
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
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Name"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'name');
              }}
              value={this.state.name}
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Email"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'email');
              }}
              value={this.state.email}
              keyboardType={'email-address'}
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Password"}
              secureTextEntry
              onChangeText={(text) => {
                this._handleTextChanged(text, 'password');
              }}
              value={this.state.password}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Confirm password"}
              secureTextEntry
              onChangeText={(text) => {
                this._handleTextChanged(text, 'confirmPassword');
              }}
              value={this.state.confirmPassword}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Phone number"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'phoneNo');
              }}
              value={this.state.phoneNo}
              keyboardType={'phone-pad'}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Office number"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'officeNo');
              }}
              value={this.state.officeNo}
              keyboardType={'phone-pad'}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Address 1"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'addressOne');
              }}
              value={this.state.addressOne}
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Address 2"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'addressTwo');
              }}
              value={this.state.addressTwo}
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Postcode"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'postcode');
              }}
              value={this.state.postcode}
              keyboardType={'numeric'}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"City"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'city');
              }}
              value={this.state.city}
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"State"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'state');
              }}
              value={this.state.state}
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <TextFieldComponent
              label={"Awards / Certificates"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'awards');
              }}
              value={this.state.awards}
              autoCorrect={false}
              componentStyle={styles.textFieldStyle}
            />

            <ModalPicker
              style={styles.modalPickerStyle}
              selectTextStyle={styles.modalPickerSelectTextStyle}
              optionTextStyle={styles.modalPickerOptionTextStyle}
              cancelTextStyle={styles.modalPickerCancelTextStyle}
              data={yearsOfExpData}
              initValue="Years of Experience"
              onChange={(option) => this._handleTextChanged(option.label, 'yearsOfExp')}
              cancelText={'Cancel'}
            />

            <ModalPicker
              style={styles.modalPickerStyle}
              selectTextStyle={styles.modalPickerSelectTextStyle}
              optionTextStyle={styles.modalPickerOptionTextStyle}
              cancelTextStyle={styles.modalPickerCancelTextStyle}
              data={yearsOfCompanyData}
              initValue="Years of Company Establish"
              onChange={(option) => this._handleTextChanged(option.label, 'yearsOfCompany')}
              cancelText={'Cancel'}
            />

            <ModalPicker
              style={styles.modalPickerStyle}
              selectTextStyle={styles.modalPickerSelectTextStyle}
              optionTextStyle={styles.modalPickerOptionTextStyle}
              cancelTextStyle={styles.modalPickerCancelTextStyle}
              data={noOfStaffData}
              initValue="Number of Staff"
              onChange={(option) => this._handleTextChanged(option.label, 'noOfStaff')}
              cancelText={'Cancel'}
            />

            <Text style={[styles.errorMessageStyle, { paddingTop: 5 }]}>
                {this.state.error}
            </Text>

            <View style={styles.signUpButtonStyle}>
              <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSelectCategories}>
                <Text style={styles.buttonTextStyle}>Next</Text>
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
    setVendorData: (vendorData) =>
      dispatch(ReduxActions.authVendorSetData(vendorData)),
    getServiceCategories: () =>
      dispatch(ReduxActions.homeGetAllServicesAttempt()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorSignUpPage);
