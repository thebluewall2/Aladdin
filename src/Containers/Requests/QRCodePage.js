import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode';

class QRCodePage extends React.PureComponent {
  render() {
    const { transactionUID } = this.props.navigationState;
    
    return (
      <View style={{ paddingTop: 70 }}>
        <Text>Show this QR code to the vendor to confirm that this service is completed</Text>
        <QRCode
          value={transactionUID}
          size={200}
        />
      </View>
    );
  }
}

export default QRCodePage;
