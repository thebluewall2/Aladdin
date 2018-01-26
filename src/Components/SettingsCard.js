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
      <View style={styles.settingCardContainterViewStyle} >
      <View style={styles.iconContainerViewStyle}>
        <Icon name={icon} size={30} style={{ padding: 5, paddingRight: 20, paddingLeft: 5 }} />
      </View>
        <View style={styles.textContainerViewStyle}>
          <Text style={styles.textStyle}>{title}</Text>
        </View>
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
  settingCardContainterViewStyle: {
    flex: 8,
    flexDirection: "row",
    alignItems: "center"
  },

  iconContainerViewStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },

  textContainerViewStyle: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "flex-start"
  },

  textStyle: {
    fontSize: 15,
    fontFamily: 'quicksand-regular'
  }
};


export default SettingsCard;
