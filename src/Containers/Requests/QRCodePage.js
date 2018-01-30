import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode';

import styles from './Styles';

class QRCodePage extends React.PureComponent {
  render() {
    const { transactionUID } = this.props.navigationState;

    return (
      <View style={styles.qrCodeContainerViewStyle}>
        <Text style={styles.qrCodeTextStyle}>
          Show this QR code to the vendor to confirm that this service is completed
        </Text>
        <View style={styles.qrCodeViewStyle}>
          <QRCode
            value={transactionUID}
            size={300}
            bgColor='#0d1d56'
            fgColor='white'
          />
        </View>
      </View>
    );
  }
}

export default QRCodePage;
