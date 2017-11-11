import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import serviceCategory from '../../../assets/data/ServiceCategories.json';
import styles from './Styles';
import CustomerCategoryList from './CustomerCategoryList';

class HomePage extends Component {
  _categoryPressed = (category) => {
    this.props.setSearchCategory(category);

    Actions.selectSubcategory();
  }

  render() {
    return (
      <View style={styles.homePageContainer}>
        <View>
          <Text style={styles.homePageWelcomeText}>
            Welcome, {this.props.email}
          </Text>
        </View>

        <CustomerCategoryList
          serviceCategories={serviceCategory}
          onPress={(category) => this._categoryPressed(category)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { email } = state.auth;

  return {
    email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchCategory: (category) =>
      dispatch(ReduxActions.homeSetSearchCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
