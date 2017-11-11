import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icons from './GetServiceCategoryIcons';


const ServiceCategoryButton = ({ onPress, category }) => {
  const icon = getImage(category);

  return (
    <View style={styles.viewStyle}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.circleStyle}>
        <Image
          source={icon}
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

const getImage = (category) => {
  switch (category.category) {
    case "Air Condition Services":
      return Icons.air_conditioning;
    case "Cleaning":
      return Icons.cleaning;
    case "Water Leaking Issues":
        return Icons.plumbing;
    case "Furniture Installation":
        return Icons.moving;
    case "Washing Machine":
        return Icons.washingMachine;
    case "Installation":
        return Icons.installation;
    case "Kitchen / Household":
        return Icons.household;
    case "Water Heater":
        return Icons.heater;
    case "Refrigerator":
        return Icons.fridge;
    case "Washroom / Bathroom":
        return Icons.washroom;
    case "Drilling Services":
        return Icons.drill;
    case "Locksmith":
        return Icons.locksmith;
    default:
      return Icons.default;
  }
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
