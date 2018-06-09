import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';

import Config from '../../Services/config';
import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';

class CreateReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ratingStars: 0,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loading, onClose } = nextProps;

    if (this.props.loading !== loading) {
      this.setState({
        loading,
      });
    }

    if (this.props.loading && !loading) {
      //from loading to finished LoadingSpinner
      onClose();
    }
  }

  _selectStar = (ratingStars) => {
    this.setState({
      ratingStars
    });
  }

  _submitReview = () => {
    const { submitReview, vendorUID } = this.props;
    const { ratingStars } = this.state;

    submitReview(vendorUID, ratingStars);
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

  _renderButtons = () => {
    const { onClose } = this.props;

    if (this.state.loading) {
      return (
        <View style={{ paddingTop: 30 }}>
          <LoadingSpinner size="small" />
        </View>
      );
    }

    return (
      <View style={styles.buttonRowStyle}>
        <TouchableOpacity onPress={onClose} style={styles.buttonStyle}>
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._submitReview} style={styles.buttonStyle}>
          <Text>Submit review</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderModal = () => {
    const { vendorName } = this.props;

    return (
      <View style={styles.modalContainer}>
        <Text style={styles.titleTextStyle}>Please leave a review</Text>
        <Text style={styles.titleTextStyle}>{vendorName}</Text>

        {this._renderReviews()}
        {this._renderButtons()}
      </View>
    );
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        style={styles.reviewContainerStyle}
        onClosed={onClose}
      >
        {this._renderModal()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
      paddingHorizontal: 8,
  },

  reviewContainerStyle: {
    paddingTop: 20,
    height: 200,
    width: Config.screenWidth * 0.85,
  },

  reviewListStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },

  reviewEmptyIconStyle: {
    fontSize: 40,
  },

  reviewFullIconStyle: {
    fontSize: 40,
    color: 'yellow',
  },

  titleTextStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 30,
    paddingHorizontal: 20
  },

  buttonStyle: {
    borderWidth: 0.8,
    borderRadius: 5,
    padding: 8,
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.requests.submittingReview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitReview: (vendorUID, review) =>
      dispatch(ReduxActions.requestsCreateReviewAttempt(vendorUID, review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);
