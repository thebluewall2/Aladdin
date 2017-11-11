import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomMultiPicker from "react-native-multiple-select-list";

import serviceCategories from '../../../../assets/data/ServiceCategories.json';
import { LoadingSpinner } from '../../../Components/common';
import styles from '../Styles';
import ReduxActions from '../../../Redux/Actions';

class VendorSelectCategories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subcategories: [],
    };
  }

  handleSignUp = () => {
    const { subcategories } = this.state;

    this.props.setVendorSubcategories(subcategories);
    this.props.vendorSignUp(this.props.vendorData);
  }

  handleSelectSubcategory = (category, subcategories) => {
    const { vendorData, setVendorSubcategories } = this.props;

    setVendorSubcategories({
      ...vendorData.subcategories,
      [category]: subcategories
    });
  }

  _renderSubmitBtn = () => {
    console.log(this.props.loading);
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
    const categories = serviceCategories;

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category === category) {
        thisSubcategory = categories[i].subcategories;
      }
    }

    return (
      <View key={category}>
        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold' }}>
          {category}
        </Text>

        <CustomMultiPicker
          options={thisSubcategory}
          search
          multiple
          returnValue={"label"}
          callback={(result) => this.handleSelectSubcategory(category, result)}
          placeholder={"Search"}
          placeholderTextColor={'#47525E'}
          iconColor={"#00BCD4"}
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


const mapStateToProps = ({ auth }) => {
  const { categories } = auth.vendorData;

  return {
    categories,
    loading: auth.loading,
    vendorData: auth.vendorData
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
