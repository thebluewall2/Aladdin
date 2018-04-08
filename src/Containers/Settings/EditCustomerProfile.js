import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ReduxActions from '../../Redux/Actions';
import { TextFieldComponent, LoadingSpinner } from '../../Components/common';
import styles from './Styles';

class EditCustomerProfile extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
        phoneNo: props.phoneNo || '',
        address: props.address[0].address || '',
        postcode: props.address[0].postcode || '',
        city: props.address[0].city || '',
        state: props.address[0].state || '',
        error: '',
      };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this._setErrorMessage(nextProps.error);
    }
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
    const { phoneNo, address, postcode, city, state } = this.state;
    const { userType, uid } = this.props;

    if (!phoneNo || !address || !postcode || !city || !state) {
      this._setErrorMessage("Field must not be blank!");
    } else {
      this._setErrorMessage("");

      const dataToUpdate = {
        phoneNo,
        address,
        postcode,
        city,
        state,
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

          <Text style={styles.errorMessageStyle}>{this.state.error}</Text>

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

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerProfile);
