import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomMultiPicker from "react-native-multiple-select-list";

import { LoadingSpinner } from '../../../Components/common';
import styles from '../Styles';
import ReduxActions from '../../../Redux/Actions';

class VendorSelectCategories extends Component {

  handleSignUp = () => {
    this.props.vendorSignUp(this.props.vendorData);
  }

  _handleSelectSubcategories = (category, thisSubcategory, subcategories) => {
    const { vendorSubcategories, setVendorSubcategories } = this.props;
    const subcategoriesInRedux = vendorSubcategories ? vendorSubcategories : [];

    const subcategoryToAddToState = thisSubcategory[subcategories[subcategories.length - 1]].id;

    const newSubcatObject = {
      categoryName: category,
      subcategory: subcategoryToAddToState
    };

    const newSubcatToState = subcategoriesInRedux.concat(newSubcatObject);

    setVendorSubcategories(newSubcatToState);
  }

  _renderSubmitBtn = () => {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.signUpButtonStyle}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.handleSignUp}>
          <Text style={styles.buttonTextStyle}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderSelectSubcategory = (category) => {
    let thisSubcategory = [];
    let subcategoriesToDisplay = [];

    const categories = this.props.serviceCategories;

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category === category) {
        thisSubcategory = categories[i].subcategories;
      }
    }

    thisSubcategory.map(sub => {
      subcategoriesToDisplay = subcategoriesToDisplay.concat(sub.name);
    });

    return (
      <View key={category}>
        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold' }}>
          {category}
        </Text>

        <CustomMultiPicker
          options={subcategoriesToDisplay}
          search
          multiple
          callback={(result) => this._handleSelectSubcategories(category, thisSubcategory, result)}
          placeholder={"Search"}
          placeholderTextColor={'#47525E'}
          iconColor={"#589fd6"}
          rowBackgroundColor={"#EEEEEE"}
          iconSize={20}
          rowHeight={50}
          rowRadius={6}
          fontFamily={'Quicksand'}
          selectedIconName={"ios-checkmark-circle-outline"}
          unselectedIconName={"ios-radio-button-off-outline"}
        />
      </View>
    );
  }

  render() {
    const categories = this.props.categories;

    return (
      <ScrollView style={styles.selectCategoriesContainer}>
        {
          categories.map((category) => (
            this.renderSelectSubcategory(category)
          ))
        }

        {this._renderSubmitBtn()}
      </ScrollView>
    );
  }
}


const mapStateToProps = ({ auth, home }) => {
  const { categories, subcategories } = auth.vendorData;
  const { serviceCategories } = home;

  return {
    categories,
    loading: auth.loading,
    vendorData: auth.vendorData,
    serviceCategories,
    vendorSubcategories: subcategories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVendorSubcategories: (subcategories) =>
      dispatch(ReduxActions.authVendorSetSubcategories(subcategories)),
    vendorSignUp: (vendorData) =>
      dispatch(ReduxActions.authUserSignUpAttempt(vendorData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorSelectCategories);
