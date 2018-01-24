import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
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
      <View style={styles.containerStyle}>
        <Camera
          onBarCodeRead={this.onBarCodeRead}
          aspect="fit"
          style={styles.preview}
          orientation="portrait"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 65,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    height: 600,
    justifyContent: 'flex-end',
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    completeTransaction: (transactionToUpdate) =>
      dispatch(ReduxActions.homeCreateOrUpdateTransactionAttempt(transactionToUpdate)),
  };
};

export default connect(null, mapDispatchToProps)(QRScanner);
