import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

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
      <View style={{ paddingTop: 70 }}>
        <Text>Status: {status}</Text>
        <Text>Date created: {dateToDisplay}</Text>

        <Text style={{ paddingTop: 10 }}>{nameToDisplay}</Text>

        <Text style={{ paddingTop: 10 }}>Service category: {selectedCategory}</Text>
        <Text>Service subcategory: {selectedSubcategory}</Text>

        <Text style={{ paddingTop: 10 }}>Service address</Text>
        <Text>{selectedAddress.address}</Text>
        <Text>{selectedAddress.city}</Text>

        <Text style={{ paddingTop: 10 }}>Dates suggested</Text>
        {timeslots.map(time => (
          <Text key={time}>{moment(time).format('lll')}</Text>
        ))}

      </View>
    );
  }
}

export default RequestDetails;
