import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';

class QRScanner extends PureComponent {
  render() {
    return (
      <View style={{ paddingTop: 70 }}>
        <Text>Hi</Text>
        <Camera
          ref={c => this.c = c}
          onBarCodeRead={this.onBarCodeRead}
          aspect="fit"
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(null, mapDispatchToProps)(QRScanner);
