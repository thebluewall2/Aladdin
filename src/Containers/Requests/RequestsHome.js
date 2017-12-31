import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import ReduxActions from '../../Redux/Actions';

class RequestsHome extends PureComponent {
  componentWillMount() {
    const { userType, userUID } = this.props;

    this.props.getTransactionList(userType, userUID);
  }

  render() {
    return (
      <View style={{ paddingTop: 70 }}>
        <Text>INCOMPLETE PAGE</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { userData, userType } = state.auth;

  return {
    userType,
    userUID: userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionList: (userType, userUID, previousConfirmDate) =>
      dispatch(ReduxActions.requestsGetTransactionListAttempt(userType, userUID, previousConfirmDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsHome);
