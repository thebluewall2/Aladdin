import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImageView from 'react-native-image-view';

import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';

import styles from './Styles';

class VendorRequestDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isImageViewModalOpen: false,
    };
  }

  _setIsImageViewModalOpen = (isImageViewModalOpen) => {
    this.setState({
      isImageViewModalOpen
    });
  }

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
      transactionUID: transaction.transactionUID,
      vendorName: transaction.vendorName,
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

  _renderImageView = () => {
    const imageUrl = this.props.transaction.downloadUrl;
    const { isImageViewModalOpen } = this.state;

    if (!imageUrl) {
      return false;
    }

    const arrayOfImages = [
      {
        source: {
          uri: imageUrl,
        }
      }
    ];

    return (
      <ImageView
        images={arrayOfImages}
        imageIndex={0}
        isVisible={isImageViewModalOpen}
        onClose={() => this._setIsImageViewModalOpen(false)}
      />
    );
  }

  _renderAttachedImage = () => {
    const imageUrl = this.props.transaction.downloadUrl;

    if (!imageUrl) {
      return false;
    }

    return (
      <View>
        <Text style={styles.orderSectionTextStyle}>Image attached</Text>

        <View style={{ paddingVertical: 10 }}>
          <TouchableOpacity onPress={() => this._setIsImageViewModalOpen(true)}>
            <Image
              source={{ uri: imageUrl }}
              style={{ height: 50, width: 50 }}
              defaultSource={require('../../../assets/pictures/imagePlaceholder.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderCompletedRequest = () => {
    return (
      <View style={styles.serviceCompletedBackgroundViewStyle}>
        <Text style={styles.serviceCompletedTextStyle}>
          Service request completed
        </Text>
      </View>
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

          {this._renderAttachedImage()}
          {this._renderImageView()}

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
      dispatch(ReduxActions.requestsRejectServiceAttempt(serviceBooking))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorRequestDetails);
