import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ReduxActions from '../Redux/Actions';

class RefreshButton extends React.PureComponent {
  _refreshData = () => {
    const { userType, userUID } = this.props;

    this.props.refreshData(userType, userUID);
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return false;
    }

    return (
      <TouchableOpacity style={styles.buttonStyle} disabled={loading} onPress={this._refreshData} >
        <Ionicons name="ios-refresh" style={styles.iconStyle} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingRight: 10,
  },
  iconStyle: {
    fontSize: 30,
    color: 'white',
  },
});

const mapStateToProps = (state) => {
  const { userData, userType } = state.auth;

  return {
    loading: state.requests.loading,
    userType,
    userUID: userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshData: (userType, userUID) =>
      dispatch(ReduxActions.requestsGetTransactionListAttempt(userType, userUID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);
