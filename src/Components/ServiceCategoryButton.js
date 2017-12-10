import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import CacheableImage from 'react-native-cacheable-image';

const ServiceCategoryButton = ({ onPress, category }) => {
  const { imageURL, categoryName } = category;

  return (
    <View style={styles.viewStyle}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.circleStyle}>

        <CacheableImage
          source={{ uri: imageURL }}
          style={styles.buttonImage}
        />

        <Text style={styles.textStyle}>
          {category.category}
        </Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = {
  viewStyle: {
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonImage: {
    height: 45,
    width: 45,
  },
  circleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#fff9c4',
  },
  textStyle: {
    fontFamily: 'Quicksand',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10
  }
};

export default ServiceCategoryButton;
