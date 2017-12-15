import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomMultiPicker from "react-native-multiple-select-list";
import { Actions } from 'react-native-router-flux';

import styles from '../Styles';
import ReduxActions from '../../../Redux/Actions';
import { LoadingSpinner } from '../../../Components/common';

class VendorSelectCategories extends Component {

  _handleSelectSubcategories = () => {
    const { selectedCategories } = this.state;

    this.props.setVendorCategories(selectedCategories);

    Actions.selectSubcategories();
  }

  render() {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    const allServiceCategories = this.props.serviceCategories;

    let categories = [];

    for (let i = 0; i < allServiceCategories.length; i++) {
      categories = categories.concat(allServiceCategories[i].category);
    }

    return (
      <View style={{ flexGrow: 1 }}>
        <ScrollView style={{ paddingTop: 10 }}>
          <CustomMultiPicker
            options={categories}
            search
            multiple
            returnValue={"label"}
            callback={(result) => this.setState({ selectedCategories: result })}
            placeholder={"Search"}
            placeholderTextColor={'#47525E'}
            iconColor={"#00BCD4"}
            rowBackgroundColor={"#EEEEEE"}
            iconSize={20}
            rowHeight={50}
            rowRadius={6}
            scrollViewHeight={450}
            fontFamily={'Quicksand'}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
          />

          <View style={styles.vendorNextButtonStyle}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this._handleSelectSubcategories}>
              <Text style={styles.buttonTextStyle}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
     </View>
    );
  }
}


const mapStateToProps = (state) => {
  const { serviceCategories, loading } = state.home;

  return {
    serviceCategories,
    loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVendorCategories: (categories) =>
      dispatch(ReduxActions.authVendorSetCategories(categories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorSelectCategories);
