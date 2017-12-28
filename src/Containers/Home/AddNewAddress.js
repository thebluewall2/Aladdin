import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { TextFieldComponent } from '../../Components/common';
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

      Actions.pop();
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

  render() {
    return (
      <View style={{ paddingTop: 70 }}>
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

        <TouchableOpacity onPress={this._handleSubmit} >
          <Text>Add address</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCoordinatesForAddress: (address) =>
      dispatch(ReduxActions.homeGetCoordinates(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);
