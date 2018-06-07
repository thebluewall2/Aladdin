import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';

import styles from './Styles';

class VendorRequestDetails extends PureComponent {
  _renderLoading = () => {
    return <LoadingSpinner />;
  }

  _renderSuggestedDates = () => {
    const { timeslots } = this.props.transaction;

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
    const { transaction } = this.props;

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
        <View>
          <TouchableOpacity style={styles.selectTimeButtonStyle} onPress={() => this._selectTimeslot(transaction)}>
            <Text style={styles.buttonTextStyle}>Select a time</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.rejectServiceButtonStyle} onPress={() => this._handleRejectTime(transaction)}>
            <Text style={styles.buttonTextStyle}>Reject service request</Text>
          </TouchableOpacity>
        </View>
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

  _renderQRScanner = () => {
    const { transaction } = this.props;

    return (

      <View style={styles.completeRequestButtonViewStyle}>
        <TouchableOpacity style={styles.completeRequestButtonStyle} onPress={() => Actions.qrScannerPage(transaction)}>
          <Text style={styles.buttonTextStyle}>Complete Service Request</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderCompletedRequest = () => {
    return (
      <Text>Service request completed</Text>
    );
  }

  render() {
    const { transaction } = this.props;

    if (Object.keys(transaction).length <= 0) {
      return this._renderLoading();
    }

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

          {status === 'Pending' && this._renderVendorResponse()}

          {status === 'Confirmed' && this._renderQRScanner()}

          {status === 'Completed' && this._renderCompletedRequest()}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { transactionUID } = props.navigationState;
  const { requests } = state;
  let transaction = {};

  requests.transactionList.map(trx => {
    if (trx.transactionUID === transactionUID) {
      transaction = trx;
    }
  });

  return {
    transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelRequest: (serviceBooking) =>
      dispatch(ReduxActions.homeCreateOrUpdateTransactionAttempt(serviceBooking))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorRequestDetails);
