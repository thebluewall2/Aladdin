import React, { Component } from 'react';
import { View, Text, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import styles from './Styles';
import CustomerCategoryList from './CustomerCategoryList';
import { LoadingSpinner } from '../../Components/common';

class HomePage extends Component {

  componentWillMount() {
    this._addInternetListener();

    if (this.props.userType === 'customer') {
        this.props.getServiceCategories();
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleInternetChange);
  }

  _addInternetListener = () => {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleInternetChange);
  }

  handleInternetChange = (isConnected) => {
    if (!isConnected) {
      Actions.offlinePage();
    } else if (!this.props.isOnline && isConnected) {
      Actions.pop();
    }

    this.props.setIsOnline(isConnected);
  }

  _categoryPressed = (category) => {
    this.props.setSearchCategory(category);

    Actions.selectSubcategory();
  }

  _renderList = () => {
    const { serviceCategories, loading, userType } = this.props;

    if (loading && !serviceCategories.length) {
      return <LoadingSpinner />;
    }

    if (userType === 'vendor') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <View style={{ backgroundColor: '#e3f1f1', height: 70, padding: 15 }}>
            <Text style={{ textAlign: 'center', fontFamily: 'quicksand-regular', fontSize: 20 }}>
              Sorry, this feature is only available for customers.
            </Text>
          </View>
        </View>
      );
    }

    return (
      <CustomerCategoryList
        serviceCategories={serviceCategories}
        onPress={(category) => this._categoryPressed(category)}
      />
    );
  }

  render() {
    return (
      <View style={styles.homePageContainer}>

        <View style={styles.homePageWelcomeTextContainer}>
          <Text style={styles.homePageWelcomeText}>
            Welcome, {this.props.fullName}
          </Text>
        </View>

        {this._renderList()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { userType } = state.auth;
  const { fullName } = state.auth.userData;
  const { loading, serviceCategories, isOnline } = state.home;

  return {
    isOnline,
    fullName,
    loading,
    serviceCategories,
    userType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsOnline: (isOnline) =>
      dispatch(ReduxActions.homeSetIsOnline(isOnline)),
    setSearchCategory: (category) =>
      dispatch(ReduxActions.homeSetSearchCategory(category)),
    getServiceCategories: () =>
      dispatch(ReduxActions.homeGetAllServicesAttempt()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
