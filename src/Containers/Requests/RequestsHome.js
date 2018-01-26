import React, { PureComponent } from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
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
    const { userType } = this.props;

    if (userType === 'customer') {
      Actions.customerRequestDetails({ transaction });
    } else {
      Actions.vendorRequestDetails({ transaction });
    }
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

  _renderList = (transactionList) => {
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

  _renderEmptyList = () => {
    return (
      <Text style={{ flex: 1, alignSelf: 'center', fontFamily: "quicksand-regular", fontSize: 15, paddingTop: 120 }}>
        No ongoing requests.
      </Text>
    );
  }

  render() {
    const { loading, transactionList } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.requestHomeContainerViewStyle}>
        {transactionList.length ?
          this._renderList(transactionList)
          :
          this._renderEmptyList()
        }
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
