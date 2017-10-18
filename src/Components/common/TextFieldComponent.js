import React from 'react';
import TextField from 'react-native-md-textinput';

const TextFieldComponent = (props) => {
  const {
    label,
    secureTextEntry,
    onChangeText,
    value,
    componentStyle
  } = props;

  const highlightColor = '#00BCD4';

  return (
    <TextField
      style={componentStyle ? componentStyle : styles.textFieldStyle}
      label={label}
      highlightColor={highlightColor}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = {
  textFieldStyle: {
    height: 30,
    width: 300,
    fontFamily: 'Quicksand-light',
  },
};

export { TextFieldComponent };
