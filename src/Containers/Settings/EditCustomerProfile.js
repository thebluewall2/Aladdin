import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextFieldComponent, LoadingSpinner } from '../../Components/common';
import styles from './Styles';

class EditCustomerProfile extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
        phoneNo: props.phoneNo || '',
        address1: props.address[0].address || '',
        postcode: props.address[0].postcode || '',
        city: props.address[0].city || '',
        state: props.address[0].state || '',
        error: '',
      };
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
    const { phoneNo, address1, postcode, city, state } = this.state;

    if (!phoneNo || !address1 || !postcode || !city || !state) {
      this._setErrorMessage("Field must not be blank!");
    } else {
      this._setErrorMessage("");
      console.log("Off to saga!");
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
              this._handleTextChanged(text, 'address1');
            }}
            value={this.state.address1}
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

          <Text>{this.state.error}</Text>

          {this._renderSignUpBtn()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { userData } = auth;

  return {
    phoneNo: userData.phoneNo,
    name: userData.fullName,
    uid: userData.uid,
    email: userData.email,
    address: userData.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerProfile);
