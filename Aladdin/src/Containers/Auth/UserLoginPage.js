import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Input } from '../../Components/common';

import styles from './Styles';

class UserLoginPage extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.quicksandText}>
          Find the best service here in Aladdin
        </Text>

        <Input
          placeholder="Email"
        />

      </View>
    );
  }
}

export default UserLoginPage;
