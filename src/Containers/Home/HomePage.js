import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import styles from './Styles';
import CustomerCategoryList from './CustomerCategoryList';
import { LoadingSpinner } from '../../Components/common';

class HomePage extends Component {

  componentWillMount() {
    if (this.props.userType === 'customer') {
        this.props.getServiceCategories();
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
        <Text>Sorry, this feature is only available for customers.</Text>
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
    setSearchCategory: (category) =>
      dispatch(ReduxActions.homeSetSearchCategory(category)),
    getServiceCategories: () =>
      dispatch(ReduxActions.homeGetAllServicesAttempt()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
