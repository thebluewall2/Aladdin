import React from 'react';
import { View, Text, Image } from 'react-native';


const TabIcon = ({ title }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabItemStyle}>
        {renderImage(title)}
        <Text style={styles.textStyle}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const renderImage = (tabTitle) => {
  if (tabTitle === 'Home') {
    return (
      <Image
      source={require('../../assets/pictures/home.png')}
      style={styles.iconStyle}
      />
    );
  } else if (tabTitle === 'Request') {
    return (
      <Image
        source={require('../../assets/pictures/request.png')}
        style={styles.iconStyle}
      />
    );
  } else if (tabTitle === 'Settings') {
    return (
      <Image
      source={require('../../assets/pictures/settings.png')}
      style={styles.iconStyle}
      />
    );
  }
};

const styles = {

  iconStyle: {
    height: 23,
    width: 23,
  },

  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FDFDFD',
    borderWidth: 0.5,
    borderColor: '#AAA9A8',
  },

  tabItemStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },

  textStyle: {
    fontFamily: 'quicksand-regular',
    fontSize: 12
  }
};

export default TabIcon;
