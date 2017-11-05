import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icons from './GetServiceCategoryIcons';

const ServiceCategoryButton = ({ onPress, category }) => {
  const icon = getImage(category);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.circleStyle}>
        <Image
          source={icon}
          style={styles.buttonImage}
        />
        <Text>{category.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getImage = (category) => {
  switch (category.category) {
    case "Air Condition Services":
      return Icons.air_conditioning;
    default:
      return Icons.default;
  }
};

const styles = {
  buttonImage: {
    height: 65,
    width: 65,
    paddingBottom: 40
  },
  circleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    backgroundColor: '#FFE758'
  }
};

export default ServiceCategoryButton;
