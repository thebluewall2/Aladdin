import React from 'react';
import TextField from 'react-native-md-textinput';

const TextFieldComponent = (props) => {
  const {
    componentStyle,
  } = props;

  const highlightColor = '#00BCD4';

  return (
    <TextField
      style={componentStyle ? componentStyle : styles.textFieldStyle}
      labelStyle={styles.labelStyle}
      {...props}
    />
  );
};

const styles = {
  textFieldStyle: {
    height: 30,
    width: 300,
    fontFamily: 'Quicksand',
  },
  labelStyle: {
    fontFamily: 'Quicksand',
    color: '#47525E'
  }
};

export { TextFieldComponent };
