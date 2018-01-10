import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';

import styles from './Styles';

class VendorRequestDetails extends PureComponent {
  _renderSuggestedDates = () => {
    const { timeslots } = this.props.navigationState.transaction;

    return (
      <View>
        <Text style={styles.orderSectionTextStyle}>Dates suggested</Text>
          {timeslots.map(time => (
            <Text style={styles.orderContentTextStyle} key={time}>
              {moment(time).format('lll')}
            </Text>
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

  _renderVendorResponse = () => {
    const { transaction } = this.props.navigationState;

    return (
      <View style={{ paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => this._selectTimeslot(transaction)}>
          <Text>Select a time</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._handleRejectTime(transaction)}>
          <Text>Reject service request</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _selectTimeslot = (transaction) => {
    Actions.vendorSelectTime({ timeslots: transaction.timeslots, transaction });
  }

  _handleRejectTime = (transaction) => {
    const transactionToUpdate = {
      trxCode: 2, //2 is for updating transactions
      transactionUID: transaction.transactionUID,
      status: "Rejected",
      customerUID: transaction.customerUID,
      vendorUID: transaction.vendorUID
    };

    this.props.cancelRequest(transactionToUpdate);
  }

  render() {
    const { transaction } = this.props.navigationState;

    const {
      selectedCategory,
      selectedSubcategory,
      selectedAddress,
      status,
      createdDate,
      customerName,
      confirmedTime,
    } = transaction;

    const nameToDisplay = `Customer name: ${customerName}`;
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

          {status === 'Pending' && this._renderVendorResponse()}
        </View>

      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelRequest: (serviceBooking) =>
      dispatch(ReduxActions.homeCreateOrUpdateTransactionAttempt(serviceBooking))
  };
};

export default connect(null, mapDispatchToProps)(VendorRequestDetails);
