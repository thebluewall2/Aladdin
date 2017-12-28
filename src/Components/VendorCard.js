import React from 'react';
import {
  TouchableOpacity,
  Switch,
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const VendorCard = (props) => {
  const { vendorUID, vendorName, distance, onPress } = props;

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={() => onPress(vendorUID)}>
      <View style={styles.contentStyle}>
        <Text style={styles.nameStyle}>{vendorName}</Text>
        <Text style={styles.distanceStyle}>{distance}km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  cardStyle: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  contentStyle: {

  },

  nameStyle: {
    fontSize: 15
  },

  distanceStyle: {
    fontSize: 12
  }
};


export default VendorCard;
