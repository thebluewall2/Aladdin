import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import ReduxActions from '../../Redux/Actions';
import serviceCategory from '../../../assets/data/ServiceCategories.json';
import CustomerCategoryList from './CustomerCategoryList';

class HomePage extends Component {
  _categoryPressed = (category) => {
    console.log("pressed:");
    console.log(category);
  }

  render() {
    return (
      <View style={{ paddingTop: 100, paddingLeft: 50 }}>
        <View>
          <Text>Welcome {this.props.email}</Text>
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
    //LEE: dispatching action here to all reducers and sagas, receiving at Sagas/Auth/login.js
    loginUser: (email, password) =>
      dispatch(ReduxActions.authLoginUser(email, password)),
    emailChanged: (email) =>
      dispatch(ReduxActions.authEmailChanged(email)),
    passwordChanged: (password) =>
      dispatch(ReduxActions.authPasswordChanged(password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
