import React, { Component } from 'react';
import { View, Text, NetInfo, Alert } from 'react-native';
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
    this.props.setIsOnline(isConnected);

    if (!isConnected) {
      Alert.alert(
        'App is offline',
        'Please check your Internet settings',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    }
  }

  _categoryPressed = (category) => {
    this.props.setSearchCategory(category);

    Actions.selectSubcategory();
  }

  _renderList = () => {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    if (this.props.userType === 'vendor') {
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
        serviceCategories={this.props.serviceCategories}
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
  const { loading, serviceCategories } = state.home;

  return {
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
