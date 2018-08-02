import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Checkbox = (props) => {
  const { isChecked, toggleCheck } = props;
  console.log(isChecked);
  return (
    <TouchableOpacity
      onPress={toggleCheck}
      style={styles.checkboxStyle}
    >
      {isChecked ?
        <Ionicons name="ios-checkmark" style={styles.checkmarkStyle} />
        :
        false
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxStyle: {
    backgroundColor: '#152740',
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 40,
  },
  checkmarkStyle: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent'
  }
});

export { Checkbox };
