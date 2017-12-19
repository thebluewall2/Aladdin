import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ModalDropdown from 'react-native-modal-dropdown';

import ReduxActions from '../../Redux/Actions';

class SelectAddress extends React.PureComponent {

  constructor(props) {
    super(props);

    const { address } = props;

    this.state = {
      address,
      addressSelected: "",
      showNextButton: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address !== nextProps.address) {
      this.setState({
        address: nextProps.address
      });
    }
  }

  _handleAddressSelected = (addressIndex) => {
    const addressSelected = this.state.address[addressIndex];

    this.setState({
      showNextButton: true,
      addressSelected
    });
  }

  _handleAddNewAddress = () => {
    Actions.addNewAddress();
  }

  _renderContent = () => {
    const addressToDisplay = this.state.address.map(add => {
      return add.address;
    });

    return (
      <View style={{ paddingLeft: 5 }}>
        <Text>Please select an address to be serviced</Text>

        <ModalDropdown
          options={addressToDisplay}
          style={{ alignSelf: 'center', paddingTop: 15 }}
          onSelect={(addressIndex) => this._handleAddressSelected(addressIndex)}
        />

        <TouchableOpacity onPress={this._handleAddNewAddress}>
          <Text>Add new address</Text>
        </TouchableOpacity>

        {this._renderNextButton()}
      </View>
    );
  }

  _renderNextButton = () => {
    if (this.state.showNextButton) {
      return (
        <View style={{ paddingTop: 50 }}>
          <TouchableOpacity onPress={this.handleOnNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return false;
  }

  handleOnNext = () => {
    const { addressSelected } = this.state;

    this.props.setUserAddress(addressSelected);
    Actions.vendorList();
  }

  render() {
    return (
      <View style={{ paddingTop: 70 }} >
        {this._renderContent()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { address } = state.auth.userData;
  console.log(state.auth);
  return {
    address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserAddress: (address) =>
      dispatch(ReduxActions.homeSetSearchAddress(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAddress);
