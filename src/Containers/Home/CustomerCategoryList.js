import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './Styles';
import ServiceCategoryButton from '../../Components/ServiceCategoryButton';

class CustomerCategoryList extends Component {

  _renderCategories() {
    const { serviceCategories, onPress } = this.props;

    if (!serviceCategories) {
      return false;
    }

    return serviceCategories.map(thisCategory =>
      <ServiceCategoryButton
        key={thisCategory.category}
        onPress={() => onPress(thisCategory)}
        category={thisCategory}
      />
    );
  }

  render() {
    return (
      <View style={styles.homePageCategoriesContainer}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.homePageCategoriesViewStyle}>
            {this._renderCategories()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CustomerCategoryList;
