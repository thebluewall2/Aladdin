import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Styles';

class CreateReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ratingStars: 0
    };
  }

  _selectStar = (ratingStars) => {
    this.setState({
      ratingStars
    });
  }

  _submitReview = () => {
    console.log(this.state.ratingStars);
  }

  _renderIcon = (stars) => {
    if (stars <= this.state.ratingStars) {
      return (
        <TouchableOpacity onPress={() => this._selectStar(stars)}>
          <Icon name={'ios-build'} style={styles.reviewFullIconStyle} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => this._selectStar(stars)}>
        <Icon name={'ios-build-outline'} style={styles.reviewEmptyIconStyle} />
      </TouchableOpacity>
    );
  }

  _renderReviews = () => {
    return (
      <View style={styles.reviewListStyle}>
        {this._renderIcon(1)}
        {this._renderIcon(2)}
        {this._renderIcon(3)}
        {this._renderIcon(4)}
        {this._renderIcon(5)}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.reviewContainerStyle}>
        <Text>Please leave a review</Text>

        {this._renderReviews()}

        <TouchableOpacity onPress={this._submitReview}>
          <Text>Submit review</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(null, mapDispatchToProps)(CreateReview);
