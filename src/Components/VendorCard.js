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
    borderColor: "#002b7a",
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  contentStyle: {
    paddingLeft: 10
  },

  nameStyle: {
    fontSize: 15,
    fontFamily: 'Quicksand-bold',
    paddingBottom: 5
  },

  distanceStyle: {
    fontSize: 12,
    fontFamily: 'Quicksand-regular',

  }
};


export default VendorCard;
