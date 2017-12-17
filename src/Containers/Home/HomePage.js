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
    this.props.getServiceCategories();
  }

  _categoryPressed = (category) => {
    this.props.setSearchCategory(category);

    Actions.selectSubcategory();
  }

  _renderList = () => {
    if (this.props.loading) {
      return <LoadingSpinner />;
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
  const { fullName } = state.auth.userData;
  const { loading, serviceCategories } = state.home;

  return {
    fullName,
    loading,
    serviceCategories,
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
