import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CacheableImage from 'react-native-cacheable-image';

const ServiceCategoryButton = ({ onPress, category }) => {
  const { imageURL } = category;

  return (
    <View style={styles.viewStyle}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circleStyle}>

          <CacheableImage
            source={{ uri: imageURL }}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.textStyle}>
          {category.category}
        </Text>
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
    height: 60,
    width: 60,
    opacity: 0.7
  },
  circleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  textStyle: {
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 3,
    color: 'white',
    width: 110,
    height: 30,
    backgroundColor: 'transparent'
  }
};

export default ServiceCategoryButton;
