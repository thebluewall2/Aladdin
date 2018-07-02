import React, { PureComponent } from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';
import RequestsCard from '../../Components/RequestsCard';
import CreateReviewModal from './CreateReview';

import Config from '../../Services/config';
import styles from './Styles';

class RequestsHome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        isReviewModalOpen: false,
    };
  }

  componentWillMount() {
    this.checkForNotifications();
    this._refreshData();
  }

  _refreshData = () => {
    const { userType, userUID } = this.props;

    this.props.getTransactionList(userType, userUID);
  }

  checkForNotifications = () => {
    const { transactionUID, transactionList, reviewTransactionUID } = this.props;

    if (transactionUID) {
      //will be present when user opens notification from tray
      this.props.updateTransaction(transactionUID);

      this._handleCardPress(transactionUID);
    } else if (reviewTransactionUID) {
      //will be present when user opens review notification from tray
      let vendorUID = '';
      let vendorName = '';

      transactionList.map(transaction => {
        if (transaction.transactionUID === reviewTransactionUID) {
          vendorUID = transaction.vendorUID;
          vendorName = transaction.vendorName;
        }
      });

      this.setState({
        isReviewModalOpen: true,
        reviewVendorUID: vendorUID,
        reviewVendorName: vendorName,
        reviewTransactionUID
      });
    }
  }

  _keyExtractor = (item) => item.transactionUID;

  _handleCardPress = (transactionUID) => {
    const { userType } = this.props;

    if (userType === 'customer') {
      Actions.customerRequestDetails({ transactionUID });
    } else {
      Actions.vendorRequestDetails({ transactionUID });
    }
  }

  _renderItem = (flatListItem) => {
    return (
      <RequestsCard
        transaction={flatListItem.item}
        userType={this.props.userType}
        onPress={(trx) => this._handleCardPress(trx.transactionUID)}
      />
    );
  }

  _renderList = (transactionList) => {
    return (
      <View style={styles.requestHomeListContainerStyle}>
        <ScrollView>
          <FlatList
            data={transactionList}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            style={{ paddingTop: Config.navBarHeight }}
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
    const { transactionList, loading } = this.props;
    const { reviewVendorUID, reviewVendorName, reviewTransactionUID } = this.state;

    if (loading) {
        return (
          <LoadingSpinner />
        );
    }

    return (
      <View style={styles.requestHomeContainerViewStyle}>
        {transactionList.length ?
          this._renderList(transactionList)
          :
          this._renderEmptyList()
        }

        <CreateReviewModal
          isOpen={this.state.isReviewModalOpen}
          onClose={() => this.setState({ isReviewModalOpen: false })}
          vendorUID={reviewVendorUID}
          vendorName={reviewVendorName}
          reviewTransactionUID={reviewTransactionUID}
        />
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
    updateTransaction: (transactionUID) =>
      dispatch(ReduxActions.requestsGetSingleTransactionAttempt(transactionUID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsHome);
