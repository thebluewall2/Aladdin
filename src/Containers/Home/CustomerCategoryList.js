import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './Styles';
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
      <View style={styles.homePageCategories}>
        {this._renderCategories()}
      </View>
      </ScrollView>
    );
  }
}

export default CustomerCategoryList;
