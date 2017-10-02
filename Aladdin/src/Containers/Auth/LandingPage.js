import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Styles';

class LandingPage extends Component {

  _onVendorPressed = () => {
    console.log("Vendor");
  }

  _onCustomerPressed = () => {
    console.log("Customer");
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.quicksand}>
          Are you a..
        </Text>

        <TouchableOpacity onPress={this._onVendorPressed}>
          <View style={styles.vendorCircle}>
            <Image
              source={require('../../../assets/pictures/Vendor.png')}
              style={styles.buttonImage}
            />
          </View>
          <Text style={styles.buttonCaption}>VENDOR</Text>
        </TouchableOpacity>

        <Text style={styles.quicksandItalic}>
          Or...
        </Text>

        <TouchableOpacity onPress={this._onCustomerPressed}>
          <View style={styles.customerCircle}>
            <Image
              source={require('../../../assets/pictures/Customer.png')}
              style={styles.buttonImage}
            />
          </View>
          <Text style={styles.buttonCaption}>USER</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default LandingPage;
