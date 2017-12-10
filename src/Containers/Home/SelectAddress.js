import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class SelectAddress extends React.PureComponent {
  render() {
    return (
      <View style={{ paddingTop: 70 }} >
        <Text>Hi</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAddress);
