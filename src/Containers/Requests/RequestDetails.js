import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import styles from './Styles';

class RequestDetails extends PureComponent {
  render() {
    const { transaction } = this.props.navigationState;
    const { userType } = this.props;

    const {
      selectedCategory,
      selectedSubcategory,
      selectedAddress,
      status,
      createdDate,
      timeslots,
      vendorName,
      customerName,
    } = transaction;

    let nameToDisplay = '';
    const dateToDisplay = moment(createdDate).format('lll');

    if (userType === 'customer') {
      nameToDisplay = `Vendor name: ${vendorName}`;
    } else {
      nameToDisplay = `Customer name: ${customerName}`;
    }

    console.log(transaction);
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", paddingTop: 70 }}>
          <Text style={styles.orderDetailsTitleTextStyle}>Status: {status}</Text>
          <Text style={styles.orderDetailsTitleTextStyle}>{nameToDisplay}</Text>
        </View>

      <View style={styles.orderDetailsContainerViewStyle}>
        <Text style={styles.orderSectionTextStyle}>Order Details:</Text>
        <Text style={styles.orderContentTextStyle}>{selectedCategory} {"- "}{selectedSubcategory}</Text>

        <Text style={styles.orderSectionTextStyle}>Service address</Text>
        <Text style={styles.orderContentTextStyle}>{selectedAddress.address}</Text>
        <Text style={styles.orderContentTextStyle}>{selectedAddress.city}</Text>

        <Text style={styles.orderSectionTextStyle}>Dates suggested</Text>
        {timeslots.map(time => (
          <Text style={styles.orderContentTextStyle} key={time}>{moment(time).format('lll')}</Text>
        ))}
        </View>
      </View>
    );
  }
}

export default RequestDetails;
