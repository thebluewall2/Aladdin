import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import ReduxActions from '../../Redux/Actions';
import { TextFieldComponent, LoadingSpinner } from '../../Components/common';
import styles from './Styles';

class AddNewAddress extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      address1: '',
      address2: '',
      city: '',
      postcode: '',
      state: '',
      errorMsg: '',
    };
  }

  _handleTextChanged = (text, property) => {
    this.setState({
      [property]: text
    });
  }

  _handleSubmit = () => {
    const { address1, address2, city, postcode, state } = this.state;

    if (!(address1 && address2 && city && postcode && state)) {
      this._setErrorMsg('Please fill in all fields');
    } else {
      this._setErrorMsg('');

      const addressToAdd = {
        address: `${address1} ${address2}`,
        city,
        postcode,
        state,
      };

      this.props.getCoordinatesForAddress(addressToAdd);
    }
  }

  _setErrorMsg = (errorMsg) => {
    this.setState({
      errorMsg
    });
  }

  _renderErrorMsg = () => {
    const { errorMsg } = this.state;

    if (errorMsg) {
      return (
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      );
    }

    return false;
  }

  _renderSubmitBtn = () => {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={{ paddingTop: 20 }} >
        <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSubmit} >
          <Text style={styles.buttonTextStyle}>Add Address</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.addNewAddressContainer}>
        <TextFieldComponent
          label={"Address 1"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'address1');
          }}
          value={this.state.address1}
          componentStyle={styles.addAddressTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"Address 2"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'address2');
          }}
          value={this.state.address2}
          componentStyle={styles.addAddressTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"City"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'city');
          }}
          value={this.state.city}
          componentStyle={styles.addAddressTextFieldStyle}
          autoCorrect={false}
        />

        <TextFieldComponent
          label={"Postcode"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'postcode');
          }}
          value={this.state.postcode}
          componentStyle={styles.addAddressTextFieldStyle}
          keyboardType={"numeric"}
        />

        <TextFieldComponent
          label={"State"}
          onChangeText={(text) => {
            this._handleTextChanged(text, 'state');
          }}
          value={this.state.state}
          componentStyle={styles.addAddressTextFieldStyle}
          autoCorrect={false}
        />

        {this._renderErrorMsg()}

        {this._renderSubmitBtn()}

      </View>
    );
  }
}

const mapStateToProps = ({ home }) => {
  return {
    loading: home.loading,
    errorMsg: home.errorMsg
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCoordinatesForAddress: (address) =>
      dispatch(ReduxActions.homeGetCoordinatesAttempt(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);
