import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { showErrorToast } from '../../Services/helpers';
import Config from '../../Services/config';

import { LoadingSpinner } from '../../Components/common';

class QRScanner extends PureComponent {
  onBarCodeRead = (qrCode) => {
    const { data } = qrCode;

    const {
      transactionUID,
      customerUID,
      vendorUID,
      vendorName,
    } = this.props;

    if (transactionUID === data) {
      const transactionToUpdate = {
        transactionUID: data,
        customerUID,
        vendorUID,
        vendorName,
      };

      this.props.completeTransaction(transactionToUpdate);
    } else {
      showErrorToast("Invalid QR code");
      Actions.pop();
    }
  }

  _renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
        <Text style={styles.loadingTextStyle}>Verifying QR Code..</Text>
      </View>
    );
  }

  render() {
    if (this.props.loading) {
      return this._renderLoading();
    }

    return (
      <View style={{ paddingTop: Config.navBarHeight, flex: 1, backgroundColor: '#000000' }}>
        <Text style={styles.qrCodeTextStyle}>
          {`Please capture the QR code that is displayed on the customer's phone`}
        </Text>

        <View style={styles.containerStyle}>
          <Camera
            onBarCodeRead={this.onBarCodeRead}
            aspect="fit"
            style={styles.preview}
            orientation="portrait"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 10,
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  preview: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'stretch',
    height: Config.screenHeight * 0.7,
    width: '100%',
  },

  qrCodeTextStyle: {
    fontFamily: 'quicksand-regular',
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 10
  },

  loadingContainer: {
    flex: 1,
    paddingTop: Config.navBarHeight,
  },

  loadingTextStyle: {
    paddingTop: 20,
    color: '#000000',
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.requests.completingTransaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    completeTransaction: (transactionToUpdate) =>
      dispatch(ReduxActions.requestsScanQrCodeAttempt(transactionToUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
