import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import styles from './Styles';
import ReduxActions from '../../Redux/Actions';
import { showErrorToast } from '../../Services/helpers';
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
      imageAttached: '',
    };
  }

  _handleDatePicked = (dateNumber, date) => {
    const { date1, date2, date3 } = this.state;

    if (Date.now() > date) {
      //date selected is before the current time
      this._setErrorMsg("Cannot pick date that is in the past or right now");
    } else if (date1 === date || date2 === date || date3 === date) {
      this._setErrorMsg("Cannot pick same date");
    } else {
      this.setState({
        [dateNumber]: date,
        errorMsg: ''
      });
    }

    this._hideDatePicker();
  }

  _setErrorMsg = (errorMsg) => {
    this.setState({
      errorMsg
    });
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
      stringToDisplay = "Select Date";
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
      return <Text style={styles.errorTextStyle}>{errorMsg}</Text>;
    }

    return false;
  }

  _compileTimeSlots = () => {
    const { date1, date2, date3 } = this.state;

    let timeslot = [];

    if (date1) {
      timeslot = timeslot.concat(parseInt(moment(date1).format("x"), 10));
    }

    if (date2) {
      timeslot = timeslot.concat(parseInt(moment(date2).format("x"), 10));
    }

    if (date3) {
      timeslot = timeslot.concat(parseInt(moment(date3).format("x"), 10));
    }

    return timeslot;
  }

  _handleSubmit = () => {
    const { date1, date2, date3 } = this.state;

    if (!date1 && !date2 && !date3) {
      this.setState({
        errorMsg: "Please select at least one time for servicing"
      });
    } else {
      this.setState({
        errorMsg: ''
      });

      const timeslot = this._compileTimeSlots();
      const {
        vendorUID,
        vendorName,
        customerUID,
        customerName,
        selectedAddress,
        selectedCategory,
        selectedSubcategory
      } = this.props;

      const serviceBooking = {
        vendorUID,
        vendorName,
        customerUID,
        customerName,
        selectedAddress,
        selectedCategory,
        selectedSubcategory,
        timeslots: timeslot,
      };

      this.props.createBooking(serviceBooking);
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
          <Text style={styles.timeTitleTextStyle}> Time {number} </Text>
            <View style={styles.chooseTimeButtonViewContainer}>
              <View>
                <TouchableOpacity style={styles.chooseTimeButtonStyle} onPress={() => this._showDatePicker(dateNumber)} >
                  <Text style={styles.buttonTextStyle}> {this._renderDate(dateNumber)}</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={styles.chooseClearButtonStyle} onPress={() => this._onClearDateTime(dateNumber)} >
                  <Text style={styles.buttonTextStyle}>Clear</Text>
                </TouchableOpacity>
              </View>

          </View>
      </View>
    );
  }

  _renderImageAttached = () => {
    const { imageAttached } = this.state;

    if (!imageAttached) {
      return false;
    }

    return (
      <Image
        source={{ uri: imageAttached }}
        style={{ height: 60, width: 60, marginRight: 20 }}
      />
    );
  }

  _showImagePicker = () => {
    const options = {
      title: 'Select image',
      quality: 0.7,
      noData: true,
      storageOptions: {
        skipBackup: true,
        cameraRoll: false,
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        //user cancelled image picker
        return;
      }

      if (response.error) {
        showErrorToast("Unable to attach image, please try again later");
        return;
      }

      this.setState({
        imageAttached: response.uri
      });
    });
  }

  _renderImagePicker = () => {
    return (
      <View style={{ paddingTop: 10 }}>
        <Text style={styles.selectAddressSubTitleStyle}>
          You can also select a photo to be attached for the vendor to view
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }} >
          {this._renderImageAttached()}

          <TouchableOpacity onPress={this._showImagePicker} style={styles.attachStyle}>
            <Ionicons name="ios-attach-outline" style={{ fontSize: 25 }} />
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
      <View style={{ paddingTop: 30 }}>
        <TouchableOpacity style={styles.chooseConfirmButtonStyle} onPress={this._handleSubmit} >
          <Text style={styles.buttonTextStyle}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 80, padding: 15 }}>
        <Text style={styles.selectAddressTitleStyle}>
        Make an Appointment{"\n"}
        </Text>
        <Text style={styles.selectAddressSubTitleStyle}>
        Please choose up to 3 time which would be convenient for the service.
        </Text>
          <Text style={{ fontFamily: 'Quicksand-bold', fontSize: 13 }}>
          At least one time must be selected{"\n"}
          </Text>

        {this._renderContent("date1", 1)}
        {this._renderContent("date2", 2)}
        {this._renderContent("date3", 3)}

        {this._renderImagePicker()}


        {this._renderErrorMsg()}
        {this._renderSubmitButton()}

        {this._renderTimeDatePicker()}

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, search } = state.home;
  const { vendorData, category, subcategory } = search;
  const { userData } = state.auth;

  return {
    vendorUID: vendorData.vendorUID,
    vendorName: vendorData.name,
    customerUID: userData.uid,
    customerName: userData.fullName,
    selectedAddress: search.userAddress,
    selectedCategory: category.category,
    selectedSubcategory: subcategory.name,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBooking: (serviceBooking) =>
      dispatch(ReduxActions.homeUserCreateBookingAttempt(serviceBooking)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTimeForService);
