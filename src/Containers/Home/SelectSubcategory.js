import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import CustomMultiPicker from "react-native-multiple-select-list";

import ReduxActions from '../../Redux/Actions';
import styles from './Styles';

class SelectSubcategory extends Component {

  _handleSubcategoryPressed = (subcategoryIndex) => {
    const { subcategories } = this.props.category;

    this.props.setSearchSubcategory(subcategories[subcategoryIndex]);

    Actions.selectAddress();
  }

  _renderSubcategories = () => {
    const { subcategories } = this.props.category;
    let subCategoriesToRender = [];

    subcategories.map(sub =>
      subCategoriesToRender.push(sub.name)
    );

    return (
      <CustomMultiPicker
        options={subCategoriesToRender}
        search
        callback={(result) => this._handleSubcategoryPressed(result)}
        placeholder={"Search"}
        placeholderTextColor={'#47525E'}
        iconColor={"#589fd6"}
        rowBackgroundColor={"#EEEEEE"}
        iconSize={20}
        rowHeight={50}
        rowRadius={6}
        scrollViewHeight={450}
        fontFamily={'Quicksand'}
        selectedIconName={"ios-arrow-dropright-circle"}
        unselectedIconName={"ios-arrow-dropright"}
      />
    );
  }

  render() {
    const { category } = this.props;

    return (
      <View style={styles.selectSubcategoryViewStyle} >
        <View>
          <Text style={styles.selectSubcategoryTextStyle} > {category.category}</Text>
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
