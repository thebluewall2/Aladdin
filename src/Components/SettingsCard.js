import React from 'react';
import {
  TouchableOpacity,
  Switch,
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const SettingsCard = (props) => {
  const { title, icon, toggleValue, hasSwitch, onPress } = props;

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={onPress}>
      <View style={styles.iconTitleStyle} >
        <Icon name={icon} size={30} style={{ paddingRight: 10, paddingLeft: 5 }} />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      {renderToggle(hasSwitch, toggleValue, onPress)}
    </TouchableOpacity>
  );
};

const renderToggle = (hasSwitch, toggleValue, onPress) => {
  if (hasSwitch) {
    return (
      <Switch value={toggleValue} onValueChange={onPress} />
    );
  }

  return false;
};

const styles = {
  cardStyle: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconTitleStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 15
  }
};


export default SettingsCard;
