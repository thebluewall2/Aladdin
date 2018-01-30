import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { showErrorToast } from '../../Services/helpers';

class QRScanner extends PureComponent {
  onBarCodeRead = (qrCode) => {
    const { data } = qrCode;

    const {
      transactionUID,
      customerUID,
      vendorUID,
    } = this.props;

    if (transactionUID === data) {
      const transactionToUpdate = {
        transactionUID: data,
        trxCode: 2,
        customerUID,
        vendorUID,
        status: "Completed"
      };

      this.props.completeTransaction(transactionToUpdate);
    } else {
      showErrorToast("Invalid QR code");
      Actions.pop();
    }
  }

  render() {
    return (
      <View style={{ paddingTop: 90, flex: 1 }}>
      <Text style={styles.qrCodeTextStyle}>
        Please capture the QR code that displayed on customers phone
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    height: 500,
    justifyContent: 'flex-end',
  },

  qrCodeTextStyle: {
    fontFamily: 'quicksand-regular',
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 10
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    completeTransaction: (transactionToUpdate) =>
      dispatch(ReduxActions.homeCreateOrUpdateTransactionAttempt(transactionToUpdate)),
  };
};

export default connect(null, mapDispatchToProps)(QRScanner);
