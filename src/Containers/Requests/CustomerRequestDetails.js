import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

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

  _renderMakePayment = () => {
    return (
      <View style={{ paddingTop: 15 }}>
        <TouchableOpacity style={styles.selectTimeButtonStyle} onPress={this._makePayment}>
          <Text style={styles.buttonTextStyle}>Make Payment</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _makePayment = () => {
    const { transaction } = this.props.navigationState;

    console.log("make payment");
  }

  _renderShowQR = (transactionUID) => {
    return (
      <TouchableOpacity onPress={() => Actions.qrCodePage({ transactionUID })}>
        <Text>Complete request</Text>
      </TouchableOpacity>
    );
  }

  _renderCompletedRequest = () => {
    return (
      <View style={{ paddingTop: 20 }}>
        <View style={styles.serviceCompletedBackgroundViewStyle}>
          <Text style={styles.serviceCompletedTextStyle}>
            Service request completed
          </Text>
        </View>
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
      confirmedTime,
      vendorName,
      transactionUID
    } = transaction;

    const nameToDisplay = `Vendor name: ${vendorName}`;

    return (
        <View style={{ flex: 1, paddingTop: 70, padding: 15 }}>
          <Text style={styles.orderDetailsTitleTextStyle}>Status: {status}</Text>
          <Text style={styles.orderSectionTextStyle}>{nameToDisplay}</Text>

          <Text style={styles.orderSectionTextStyle}>Order Details:</Text>
          <Text style={styles.orderContentTextStyle}>{selectedCategory} {"- "}{selectedSubcategory}</Text>

          <Text style={styles.orderSectionTextStyle}>Service address</Text>
          <Text style={styles.orderContentTextStyle}>{selectedAddress.address}</Text>
          <Text style={styles.orderContentTextStyle}>{selectedAddress.city}</Text>

          {confirmedTime ? this._renderConfirmedDate(confirmedTime) : this._renderSuggestedDates()}

        {status === 'Awaiting payment' && this._renderMakePayment()}

        {status === 'Confirmed' && this._renderShowQR(transactionUID)}

        {status === 'Completed' && this._renderCompletedRequest()}

        </View>
    );
  }
}

export default CustomerRequestDetails;
