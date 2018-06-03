import React from 'react';
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const VendorCard = (props) => {
  const { vendorUID, vendorName, distance, onPress, reviews, totalReviews } = props;

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={() => onPress(vendorUID)}>
      <View style={styles.contentStyle}>
        <Text style={styles.nameStyle}>{vendorName}</Text>
        {_renderReviews(reviews, totalReviews)}
        <Text style={styles.distanceStyle}>{distance}km</Text>
      </View>
    </TouchableOpacity>
  );
};

const _renderReviews = (reviews, totalReviews) => {
  if (reviews) {
    return (
      <View style={styles.reviewsStyle}>
        {_renderStars(1, reviews)}
        {_renderStars(2, reviews)}
        {_renderStars(3, reviews)}
        {_renderStars(4, reviews)}
        {_renderStars(5, reviews)}
        <Text style={styles.totalReviewTextStyle}>({totalReviews})</Text>
      </View>
    );
  }

  return (
    <View style={styles.reviewsStyle}>
      <Text style={{ fontStyle: 'italic' }}>Not enough reviews to display right now</Text>
    </View>
  );
};

const _renderStars = (number, reviews) => {
  if (number <= reviews) {
    return (
      <Icon name={'ios-build'} style={styles.reviewFullIconStyle} />
    );
  }

  return (
    <Icon name={'ios-build-outline'} style={styles.reviewEmptyIconStyle} />
  );
};

const styles = {
  cardStyle: {
    borderBottomWidth: 1,
    borderColor: "#002b7a",
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  contentStyle: {
    paddingLeft: 10
  },

  nameStyle: {
    fontSize: 15,
    fontFamily: 'Quicksand-bold',
    paddingBottom: 5
  },

  distanceStyle: {
    fontSize: 12,
    fontFamily: 'Quicksand-regular',
  },

  reviewsStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },

  reviewEmptyIconStyle: {
    fontSize: 24,
  },

  reviewFullIconStyle: {
    fontSize: 24,
    color: 'yellow',
  },

  totalReviewTextStyle: {
    paddingHorizontal: 5,
  }
};


export default VendorCard;
