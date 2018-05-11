import React, { PureComponent } from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';
import RequestsCard from '../../Components/RequestsCard';
import CreateReviewModal from './CreateReview';

import styles from './Styles';

class RequestsHome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        isReviewModalOpen: false,
    };
  }

  componentWillMount() {
    const { userType, userUID } = this.props;

    this.checkForNotifications();

    this.props.getTransactionList(userType, userUID);
  }

  checkForNotifications = () => {
    const { transactionUID, transactionList, reviewTransactionUID } = this.props;

    if (transactionUID) {
      //will be present when user opens notification from tray
      transactionList.map(transaction => {
        if (transaction.transactionUID === transactionUID) {
          this._handleCardPress(transaction);
        }
      });
    } else if (reviewTransactionUID) {
      //will be present when user opens review notification from tray
      let vendorUID = '';

      transactionList.map(transaction => {
        if (transaction.transactionUID === reviewTransactionUID) {
          vendorUID = transaction.vendorUID;
        }
      });

      this.setState({
        isReviewModalOpen: true,
        reviewVendorUID: vendorUID,
      });
    }
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
      <View style={styles.requestHomeListContainerStyle}>
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
    const { loading } = this.props;

    if (loading) {
        return (
          <LoadingSpinner />
        );
    }

    return (
      <Text style={{ flex: 1, alignSelf: 'center', fontFamily: "quicksand-regular", fontSize: 15, paddingTop: 120 }}>
        No ongoing requests.
      </Text>
    );
  }

  render() {
    const { transactionList } = this.props;
    const { reviewVendorUID } = this.state;

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsHome);
