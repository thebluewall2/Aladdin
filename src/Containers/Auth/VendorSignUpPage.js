import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalPicker from 'react-native-modal-picker';
import { Actions } from 'react-native-router-flux';

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
      email: '',
      password: '',
      phoneNo: '',
      officeNo: '',
      addressOne: '',
      addressTwo: '',
      postcode: '',
      city: '',
      yearsOfExp: 0,
      yearsOfCompany: 0,
      noOfStaff: 0,
      awards: '',
    };
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

  _handleSelectCategories = () => {
    const data = this.state;
    this.props.setVendorData(data);

    Actions.selectCategories();
  }

  render() {
    const yearsOfExpData = this.getYearsOfExperienceData();
    const yearsOfCompanyData = this.getYearsOfCompanyData();
    const noOfStaffData = this.getNoOfStaffData();

    return (
      <View style={styles.signUpPageMainContainer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
              label={"Email"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'email');
              }}
              value={this.state.email}
            />

            <TextFieldComponent
              label={"Password"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'password');
              }}
              value={this.state.password}
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
              value={this.state.city}
            />

            <ModalPicker
              data={yearsOfExpData}
              initValue="Years of Experience"
              onChange={(option) => this._handleTextChanged(option.label, 'yearsOfExp')}
            />

            <ModalPicker
              data={yearsOfCompanyData}
              initValue="Years of Company Establish"
              onChange={(option) => this._handleTextChanged(option.label, 'yearsOfCompany')}
            />

            <ModalPicker
              data={noOfStaffData}
              initValue="Number of Staff"
              onChange={(option) => this._handleTextChanged(option.label, 'noOfStaff')}
            />

            <TextFieldComponent
              label={"Awards / Certificates"}
              onChangeText={(text) => {
                this._handleTextChanged(text, 'awards');
              }}
              value={this.state.awards}
            />

            <View style={styles.signUpButtonStyle}>
              <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSelectCategories}>
                <Text style={styles.buttonTextStyle}> Choose Service Categories</Text>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorSignUpPage);
