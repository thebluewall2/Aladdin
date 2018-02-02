import React from 'react';
import TextField from 'react-native-md-textinput';
import Platform from 'react-native';

const TextFieldComponent = (props) => {
  const {
    componentStyle,
  } = props;

  return (
    <TextField
      style={componentStyle || styles.textFieldStyle}
      labelStyle={styles.labelStyle}
      {...props}
    />
  );
};

const styles = {
  textFieldStyle: {
    width: 300,
    fontFamily: 'Quicksand',
    height: Platform.OS === 'ios' ? 30 : 40,

  },
  labelStyle: {
    fontFamily: 'Quicksand',
    color: '#47525E'
  }
};

export { TextFieldComponent };
