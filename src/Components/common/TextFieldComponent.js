import React from 'react';
import TextField from 'react-native-md-textinput';
import { Platform } from 'react-native';

class TextFieldComponent extends React.PureComponent {
  focus = () => {
    this.refs.textInput.focus();
  }

  render() {
    const { componentStyle } = this.props;

    return (
      <TextField
        ref="textInput"
        style={componentStyle || styles.textFieldStyle}
        labelStyle={styles.labelStyle}
        {...this.props}
      />
    );
  }
}

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
