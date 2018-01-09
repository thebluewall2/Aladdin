import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import styles from './Styles';

class CustomerRequestDetails extends PureComponent {
  _renderSuggestedDates = () => {
    const { timeslots } = this.props.navigationState.transaction;

    return (
      <View>
        <Text style={styles.orderSectionTextStyle}>Dates suggested</Text>
          {timeslots.map(time => (
            <Text style={styles.orderContentTextStyle} key={time}>{moment(time).format('lll')}</Text>
          ))}
      </View>
    );
  }

  _renderConfirmedDate = (time) => {
    const dateToDisplay = moment(time).format('lll');

    return (
      <View>
        <Text style={styles.orderSectionTextStyle}>Confirmed date</Text>
        <Text style={styles.orderContentTextStyle}>{dateToDisplay}</Text>
      </View>
    );
  }

  render() {
    const { transaction } = this.props.navigationState;

    const {
      selectedCategory,
      selectedSubcategory,
      selectedAddress,
      status,
      createdDate,
      confirmedTime,
      vendorName,
    } = transaction;

    const nameToDisplay = `Vendor name: ${vendorName}`;
    const dateToDisplay = moment(createdDate).format('lll');

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

        {confirmedTime ? this._renderConfirmedDate(confirmedTime) : this._renderSuggestedDates()}

        </View>
      </View>
    );
  }
}

export default CustomerRequestDetails;
