import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalPicker from 'react-native-modal-picker';

import ReduxActions from '../../Redux/Actions';
import { TextFieldComponent, LoadingSpinner } from '../../Components/common';
import styles from './Styles';

class EditVendorProfile extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
        phoneNo: props.phoneNo || '',
        address: props.address[0].address || '',
        postcode: props.address[0].postcode || '',
        city: props.address[0].city || '',
        state: props.address[0].state || '',
        awards: props.awards || '',
        companyName: props.companyName || '',
        noOfStaff: props.noOfStaff || '',
        yearsOfExp: props.yearsOfExp || '',
        yearsOfCompany: props.yearsOfCompany || '',
        error: '',
      };
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;

    if (error) {
      this._setErrorMessage(error);
    }
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

  _renderSignUpBtn = () => {
    const { loading } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.saveButtonStyle}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSubmit}>
          <Text style={styles.buttonTextStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleSubmit = () => {
    const {
      phoneNo, address, awards, city, companyName, noOfStaff, postcode, state, yearsOfCompany, yearsOfExp
    } = this.state;
    const { userType, uid } = this.props;

    if (!phoneNo || !address || !awards || !city || !companyName || !noOfStaff || !postcode || !state) {
      this._setErrorMessage("Field must not be blank!");
    } else {
      this._setErrorMessage("");

      const dataToUpdate = {
        phoneNo,
        address,
        awards,
        city,
        companyName,
        noOfStaff,
        postcode,
        state,
        yearsOfCompany,
        yearsOfExp,
      };

      this.props.editProfile(userType, uid, dataToUpdate);
    }
  }

  _setErrorMessage = (error) => {
    this.setState({
      error
    });
  }

  render() {
    const yearsOfExpData = this.getYearsOfExperienceData();
    const yearsOfCompanyData = this.getYearsOfCompanyData();
    const noOfStaffData = this.getNoOfStaffData();

    return (
      <View style={styles.editProfileContainerStyle}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableResetScrollToCoords={false}
        >
          <Text style={styles.titleSignUpStyle}>
            Edit your profile
          </Text>

          <TextFieldComponent
            label={"Name"}
            editable={false}
            value={this.props.name}
            componentStyle={styles.disabledTextInputStyle}
          />

          <TextFieldComponent
            label={"Email"}
            value={this.props.email}
            editable={false}
            componentStyle={styles.disabledTextInputStyle}
          />

          <TextFieldComponent
            label={"Company name"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'companyName');
            }}
            value={this.state.companyName}
            componentStyle={styles.textInputStyle}
            autoCorrect={false}
          />

          <TextFieldComponent
            label={"Phone number"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'phoneNo');
            }}
            value={this.state.phoneNo}
            componentStyle={styles.textInputStyle}
          />

          <TextFieldComponent
            label={"Address 1"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'address');
            }}
            value={this.state.address}
            componentStyle={styles.textInputStyle}
            autoCorrect={false}
          />

          <TextFieldComponent
            label={"City"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'city');
            }}
            value={this.state.city}
            componentStyle={styles.textInputStyle}
            autoCorrect={false}
          />

          <TextFieldComponent
            label={"Postcode"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'postcode');
            }}
            value={this.state.postcode}
            componentStyle={styles.textInputStyle}
            keyboardType={"numeric"}
          />

          <TextFieldComponent
            label={"State"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'state');
            }}
            value={this.state.state}
            componentStyle={styles.textInputStyle}
            autoCorrect={false}
          />

          <TextFieldComponent
            label={"Awards / Certificates"}
            onChangeText={(text) => {
              this._handleTextChanged(text, 'awards');
            }}
            value={this.state.awards}
            componentStyle={styles.textInputStyle}
            autoCorrect={false}
          />

          <View style={styles.modalPickerViewStyle}>
            <Text style={styles.editProfileTextStyle}>
              Years of experience
            </Text>
            <ModalPicker
              style={styles.modalPickerStyle}
              selectTextStyle={styles.modalPickerSelectTextStyle}
              optionTextStyle={styles.modalPickerOptionTextStyle}
              cancelTextStyle={styles.modalPickerCancelTextStyle}
              data={yearsOfExpData}
              initValue={this.state.yearsOfExp}
              onChange={(option) => this._handleTextChanged(option.label, 'yearsOfExp')}
              cancelText={'Cancel'}
            />

            <Text style={styles.editProfileTextStyle}>
              Years of company established
            </Text>
            <ModalPicker
              style={styles.modalPickerStyle}
              selectTextStyle={styles.modalPickerSelectTextStyle}
              optionTextStyle={styles.modalPickerOptionTextStyle}
              cancelTextStyle={styles.modalPickerCancelTextStyle}
              data={yearsOfCompanyData}
              initValue={this.state.yearsOfCompany}
              onChange={(option) => this._handleTextChanged(option.label, 'yearsOfCompany')}
              cancelText={'Cancel'}
            />

            <Text style={styles.editProfileTextStyle}>
              Number of staff
            </Text>
            <ModalPicker
              style={styles.modalPickerStyle}
              selectTextStyle={styles.modalPickerSelectTextStyle}
              optionTextStyle={styles.modalPickerOptionTextStyle}
              cancelTextStyle={styles.modalPickerCancelTextStyle}
              data={noOfStaffData}
              initValue={this.state.noOfStaff}
              onChange={(option) => this._handleTextChanged(option.label, 'noOfStaff')}
              cancelText={'Cancel'}
            />

            <Text style={styles.errorMessageStyle}>{this.state.error}</Text>

          </View>
          {this._renderSignUpBtn()}

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { userData } = state.auth;

  return {
    userType: state.auth.userType,
    phoneNo: userData.phoneNo,
    name: userData.fullName,
    uid: userData.uid,
    email: userData.email,
    address: userData.address,
    awards: userData.awards,
    companyName: userData.companyName,
    noOfStaff: userData.noOfStaff,
    yearsOfExp: userData.yearsOfExp,
    yearsOfCompany: userData.yearsOfCompany,
    loading: state.settings.attempting,
    error: state.settings.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (userType, userUID, profileInfo) =>
      dispatch(ReduxActions.settingsEditProfileAttempt(userType, userUID, profileInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditVendorProfile);
