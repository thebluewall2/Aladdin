import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';

class ChooseTimeForService extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDatePicker: false,
      date1: '',
      date2: '',
      date3: '',
      dateNumber: '',
      errorMsg: '',
    };
  }

  _handleDatePicked = (dateNumber, date) => {
    this.setState({
      [dateNumber]: date
    });

    this._hideDatePicker();
  }

  _showDatePicker = (dateNumber) => {
    this.setState({
      showDatePicker: true,
      dateNumber
    });
  }

  _hideDatePicker = () => {
    this.setState({
      showDatePicker: false
    });
  }

  _renderDate = (dateNumber) => {
    const date = this.state[dateNumber];

    let stringToDisplay = '';

    if (date) {
      stringToDisplay = moment(date).format("Do MMM YYYY h mm a");
    } else {
      stringToDisplay = "Select date";
    }

    return (
      <Text>{stringToDisplay}</Text>
    );
  }

  _renderTimeDatePicker = () => {
    const { dateNumber } = this.state;

    return (
      <View>
        <DateTimePicker
          mode={"datetime"}
          isVisible={this.state.showDatePicker}
          onConfirm={(date) => this._handleDatePicked(dateNumber, date)}
          onCancel={this._hideDatePicker}
        />
      </View>
    );
  }

  _renderErrorMsg = () => {
    const { errorMsg } = this.state;

    if (errorMsg) {
      return <Text>{errorMsg}</Text>;
    }

    return false;
  }

  _compileTimeSlots = () => {
    const { date1, date2, date3 } = this.state;

    let timeslot = [];

    if (date1) {
      timeslot = timeslot.concat(moment(date1).format("x"));
    }

    if (date2) {
      timeslot = timeslot.concat(moment(date2).format("x"));
    }

    if (date3) {
      timeslot = timeslot.concat(moment(date3).format("x"));
    }

    return timeslot;
  }

  _handleSubmit = () => {
    const { date1 } = this.state;

    if (!date1) {
      this.setState({
        errorMsg: "Please select at least one time for servicing"
      });
    } else {
      this.setState({
        errorMsg: ''
      });

      const timeslot = this._compileTimeSlots();
      const { vendorUID, customerUID, customerName } = this.props;

      const serviceBooking = {
        trxCode: 1, //1 for create new trx
        trxID: null, //null means new trx
        vendorUID,
        customerUID,
        customerName,
        price: 0,
        timeslots: timeslot,
        confirmedTime: null, //no confirmed time yet
        status: 'Pending'
      };

      this.props.createBooking(serviceBooking);
      Actions.pop({ popNum: 5 });
    }
  }

  _onClearDateTime = (dateNumber) => {
    this.setState({
      [dateNumber]: '',
    });
  }

  _renderContent = (dateNumber, number) => {
    return (
      <View>
        <Text style={{ paddingTop: 10, alignSelf: 'center' }}>Time {number}</Text>

        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => this._showDatePicker(dateNumber)}>
            {this._renderDate(dateNumber)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._onClearDateTime(dateNumber)}>
            <Text>Clear</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  _renderSubmitButton = () => {
    if (this.props.loading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <TouchableOpacity onPress={this._handleSubmit}>
        <Text>Confirm booking</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <Text>Please choose up to 3 time which would be convenient for the service.</Text>
        <Text>At least one time must be selected</Text>

        {this._renderContent("date1", 1)}
        {this._renderContent("date2", 2)}
        {this._renderContent("date3", 3)}

        {this._renderErrorMsg()}
        {this._renderSubmitButton()}

        {this._renderTimeDatePicker()}

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { search, loading } = state.home;
  const { userData } = state.auth;

  return {
    vendorUID: search.vendorData.vendorUID,
    customerUID: userData.uid,
    customerName: userData.fullName,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBooking: (serviceBooking) =>
      dispatch(ReduxActions.homeCreateOrUpdateTransactionAttempt(serviceBooking))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTimeForService);
