import React, { PureComponent } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';
import RequestsCard from '../../Components/RequestsCard';

import styles from './Styles';

class RequestsHome extends PureComponent {
  componentWillMount() {
    const { userType, userUID } = this.props;

    this.props.getTransactionList(userType, userUID);
  }

  _keyExtractor = (item) => item.transactionUID;

  _handleCardPress = (transaction) => {
    Actions.requestDetails({ transaction, userType: this.props.userType });
  }

  _renderItem = (flatListItem) => {
    return (
      <RequestsCard
        transaction={flatListItem.item}
        userType={this.props.userType}
        onPress={this._handleCardPress}
      />
    );
  }

  render() {
    const { loading, transactionList } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.requestHomeContainerViewStyle}>
        <ScrollView>
          <FlatList
            data={transactionList}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            style={{ paddingTop: 70 }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { transactionList, loading } = state.requests;
  const { userData, userType } = state.auth;

  return {
    userType,
    userUID: userData.uid,
    transactionList,
    loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionList: (userType, userUID) =>
      dispatch(ReduxActions.requestsGetTransactionListAttempt(userType, userUID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsHome);