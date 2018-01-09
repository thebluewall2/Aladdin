import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import moment from 'moment';

import ReduxActions from '../../Redux/Actions';
import { showToast } from '../../Services/helpers';

class VendorSelectTime extends PureComponent {
  _keyExtractor = (item) => item;

  _renderRow = ({ item }) => {
    const timeToDisplay = moment(item).format('lll');

    return (
      <TouchableOpacity onPress={() => this._selectTimeslot(item)}>
        <Text>{timeToDisplay}</Text>
      </TouchableOpacity>
    );
  }

  _selectTimeslot = (time) => {
    const { transaction } = this.props.navigationState;
    // this.props.confirmTime(time);
    const transactionToUpdate = {
      trxCode: 2, //2 is for updating transactions
      transactionUID: transaction.transactionUID,
      confirmedTime: time,
      orderByDate: -time,
      status: "Awaiting payment",
      customerUID: transaction.customerUID,
      vendorUID: transaction.vendorUID
    };

    this.props.confirmTime(transactionToUpdate);
  }

  render() {
    return (
      <View style={{ paddingTop: 70 }}>
        <Text>Select a time</Text>

        <FlatList
          data={this.props.navigationState.timeslots}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderRow}
        />

      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    confirmTime: (serviceBooking) =>
      dispatch(ReduxActions.homeCreateOrUpdateTransactionAttempt(serviceBooking))
  };
};

export default connect(null, mapDispatchToProps)(VendorSelectTime);
