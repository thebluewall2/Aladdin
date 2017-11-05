import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ServiceCategoryButton from '../../Components/ServiceCategoryButton';

class CustomerCategoryList extends Component {

  _renderCategories() {
    const { serviceCategories, onPress } = this.props;

    return serviceCategories.map(thisCategory =>
      <ServiceCategoryButton
        key={thisCategory.category}
        onPress={this._handleOnPress(thisCategory)}
        category={thisCategory}
      />
    );
  }

  _handleOnPress = (category) => {
    this.props.onPress(category);
  }

  render() {
    return (
      <ScrollView>
        {this._renderCategories()}
      </ScrollView>
    );
  }
}

export default CustomerCategoryList;
