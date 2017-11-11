import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import CustomMultiPicker from "react-native-multiple-select-list";

import ReduxActions from '../../Redux/Actions';

class SelectSubcategory extends Component {

  _handleSubcategoryPressed = (subcategory) => {
    this.props.setSearchSubcategory(subcategory);
    
    Actions.vendorList();
  }

  _renderSubcategories = () => {
    const { subcategories } = this.props.category;

    return (
      <CustomMultiPicker
        options={subcategories}
        search
        returnValue={"label"}
        callback={(result) => this._handleSubcategoryPressed(result)}
        selectedIconName={"ios-arrow-dropright-circle"}
        unselectedIconName={"ios-arrow-dropright"}
      />
    );
  }

  render() {
    const { category } = this.props;

    return (
      <View style={{ paddingTop: 100 }}>
        <View>
          <Text style={{ paddingLeft: 5 }}>{category.category}</Text>
          <ScrollView>
            {this._renderSubcategories()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state.home;

  return {
    category: search.category
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchSubcategory: (subcategory) =>
      dispatch(ReduxActions.homeSetSearchSubcategory(subcategory)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSubcategory);
