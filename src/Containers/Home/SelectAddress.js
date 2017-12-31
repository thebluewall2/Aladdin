import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ModalDropdown from 'react-native-modal-dropdown';
import styles from './Styles';

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

  _showAddressDropdown = () => {
    this.addressDropdown.show();
  }

  _renderContent = () => {
    const addressToDisplay = this.state.address.map(add => {
      return add.address;
    });

    return (
      <View style={styles.selectAddressContainerStyle}>
      <View style={{ flex: 1, paddingBottom: 70 }}>
        <Text style={styles.selectAddressTitleStyle}>
          Select Service address {"\n"}
        </Text>

        <Text style={styles.selectAddressSubTitleStyle}>
          Please select an address to be serviced
        </Text>
        </View>

        <View style={styles.addressButtonViewContainer}>
          <TouchableOpacity style={styles.addressDropdownBoxStyle} onPress={this._showAddressDropdown} >
            <Text style={styles.buttonTextStyle}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        <ModalDropdown
          ref={c => this.addressDropdown = c}
          options={addressToDisplay}
          style={{ paddingTop: 20, padding: 15 }}
          onSelect={addressIndex => this._handleAddressSelected(addressIndex)}
          textStyle={{ fontFamily: 'Quicksand-regular', fontSize: 15, justifyContent: 'flex-start' }}
          dropdownStyle={{ alignSelf: 'center', borderColor: '#000000' }}
          dropdownTextStyle={{ fontFamily: 'Quicksand-regular', fontSize: 12, color: '#000000' }}
          adjustFrame={(options) => this._handleFrameAdjust(options)}
        />

        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this._handleAddNewAddress} >
            <Text style={styles.buttonTextStyle}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        {this._renderNextButton()}
      </View>
    );
  }

  _handleFrameAdjust = (options) => {
    return {
      ...options,
      height: 100,
      width: 350,
      top: 205,
      right: 20,
      left: 10
    };
  }

  _renderNextButton = () => {
    if (this.state.showNextButton) {
      return (
        <View style={styles.addressNextButtonContainerStyle}>
          <TouchableOpacity style={styles.addressNextButtonStyle} onPress={this.handleOnNext} >
            <Text style={styles.buttonTextStyle}>Next</Text>
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
