import React from 'react';
import TextField from 'react-native-md-textinput';

const TextFieldComponent = (props) => {
  const {
    label,
    highlightColor,
    secureTextEntry,
    onChangeText,
    value
  } = props;

  return (
    <TextField
      style={styles.textFieldStyle}
      label={label}
      highlightColor={highlightColor}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    />
  )
}

const styles = {
  textFieldStyle: {
    height: 30,
    width: 300,
    fontFamily: 'Quicksand-LightItalic',
  },
};

export { TextFieldComponent };
