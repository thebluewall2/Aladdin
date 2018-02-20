import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomMultiPicker from "react-native-multiple-select-list";
import { Actions } from 'react-native-router-flux';

import styles from '../Styles';
import ReduxActions from '../../../Redux/Actions';
import { LoadingSpinner } from '../../../Components/common';
import Config from '../../../Services/config';

class VendorSelectCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: [],
      error: ''
    };
  }

  _handleSelectSubcategories = () => {
    const { selectedCategories } = this.state;
    this._setErrorMessage('');

    if (selectedCategories.length) {
      this.props.setVendorCategories(selectedCategories);

      Actions.selectSubcategories();
    } else {
      this._setErrorMessage("Please select at least one category");
    }
  }

  _setErrorMessage = (error) => {
    this.setState({
      error
    });
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
      <View style={{ flex: 1, marginTop: Config.navBarHeight }}>
        <ScrollView>
          <CustomMultiPicker
            options={categories}
            search
            multiple
            returnValue={"label"}
            callback={(result) => this.setState({ selectedCategories: result })}
            placeholder={"Search"}
            placeholderTextColor={'#47525E'}
            iconColor={"#589fd6"}
            rowBackgroundColor={"#EEEEEE"}
            iconSize={20}
            rowHeight={50}
            rowRadius={6}
            scrollViewHeight={450}
            fontFamily={'Quicksand'}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
          />

          {this.state.error ?
            <Text style={styles.errorMessageStyle}>{this.state.error}</Text> :
            false
          }

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
