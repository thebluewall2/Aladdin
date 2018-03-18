import React from 'react';
import { View, Text } from 'react-native';
import Config from '../../Services/config';

class OfflinePage extends React.PureComponent {
  render() {
    return (
      <View style={{ marginTop: Config.navBarHeight }}>
        <Text>No Internet connection detected. Please check your Internet connection.</Text>
      </View>
    );
  }
}

export default OfflinePage;
