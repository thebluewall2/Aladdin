import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomMultiPicker from "react-native-multiple-select-list";

import { LoadingSpinner } from '../../../Components/common';
import styles from '../Styles';
import ReduxActions from '../../../Redux/Actions';

class VendorSelectCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      categories: {},
    };
  }

  handleSignUp = () => {
    const { vendorData } = this.props;
    const { categories } = this.state;
    let canProceed = true;

    this._setErrorMessage('');

    this.props.categories.map(propCategory => {
      let isAtLeastOneSubcategorySelected = false;

      Object.keys(categories).map(stateCategory => {
        if (categories[stateCategory].length && stateCategory === propCategory) {
          isAtLeastOneSubcategorySelected = true;
        }
      });

      if (!isAtLeastOneSubcategorySelected) {
        this._setErrorMessage("Please make sure at least one subcategory is chosen for each category.");
        canProceed = false;
      }
    });

    if (canProceed) {
      const signUpData = {
        ...vendorData,
        categories,
      };

      this.props.vendorSignUp(signUpData);
    }
  }

  _setErrorMessage = (error) => {
    this.setState({
      error
    });
  }


  _renderError = () => {
    const { error } = this.state;

    if (error) {
      return (
        <Text style={styles.errorMessageStyle}>{error}</Text>
      );
    }

    return false;
  }

  _handleSelectSubcategories = (category, subcategoriesSelected) => {
    this.setState({
      categories: {
        ...this.state.categories,
        [category]: subcategoriesSelected
      }
    });
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
    let subcategoriesInThisCategory = [];
    let subcategoriesToDisplay = [];

    const categories = this.props.serviceCategories;

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category === category) {
        subcategoriesInThisCategory = categories[i].subcategories;
      }
    }

    subcategoriesInThisCategory.map(sub => {
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
          callback={(result) => {
            let subcategoriesSelected = [];

            result.map(index => subcategoriesSelected = subcategoriesSelected.concat(subcategoriesInThisCategory[index].id));
            this._handleSelectSubcategories(category, subcategoriesSelected);
          }}
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

        {this._renderError()}

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
    vendorSignUp: (vendorData) =>
      dispatch(ReduxActions.authUserSignUpAttempt(vendorData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorSelectCategories);
