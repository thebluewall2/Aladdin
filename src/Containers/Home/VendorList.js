import React, { PureComponent } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './Styles';
import ReduxActions from '../../Redux/Actions';

import { LoadingSpinner } from '../../Components/common';
import VendorCard from '../../Components/VendorCard';
import Config from '../../Services/config';

class VendorList extends PureComponent {
  componentWillMount() {
    const { category, subcategory, userAddress } = this.props;

    this.props.getVendorList(category, subcategory, userAddress);
  }

  _keyExtractor = (item) => item.vendorUID;

  _renderEmpty = () => {
    return (
      <View style={styles.noVendorFoundStyle}>
        <Text style={styles.noVendorFoundTextStyle}>
          No vendors for this service found. Please try again with another service.
        </Text>
      </View>
    );
  }

  _renderContent = () => {
    const { loading, vendorList } = this.props;

    if (loading) {
      return (
        <View style={{ paddingTop: 50 }}>
          <LoadingSpinner />
        </View>
      );
    }

    return (
      <FlatList
        data={vendorList}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmpty}
      />
    );
  }

  _renderItem = (vendor) => {
    const { vendorUID, name, distance, reviewScore } = vendor.item;

    let reviews;
    let totalReviews;

    if (reviewScore && reviewScore.totalReviews >= Config.vendorMinimumReviewsToDisplay) {
      reviews = reviewScore.avgReviews;
      totalReviews = reviewScore.totalReviews;
    }

    return (
      <VendorCard
        vendorUID={vendorUID}
        vendorName={name}
        distance={distance}
        reviews={reviews}
        totalReviews={totalReviews}
        onPress={(vendorID) => this._handleVendorPressed(vendorID)}
      />
    );
  }

  _handleVendorPressed = (vendorID) => {
    Actions.vendorDataPage({ vendorID });
  }

  render() {
    return (
      <View style={styles.vendorListViewContainer}>
        <View style={styles.vendorListTitleContainer}>
          <Text style={styles.vendorListTitleStyle}>
            Nearest Vendors
          </Text>
          </View>
          <ScrollView>
              <View style={styles.vendorListContentContainer}>
                {this._renderContent()}
              </View>
            </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ home }) => {
  const { search, loading } = home;

  return {
    category: search.category.category,
    subcategory: search.subcategory,
    userAddress: search.userAddress,
    vendorList: search.vendorList,
    loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVendorList: (category, subcategory, userAddress) =>
      dispatch(ReduxActions.homeGetVendorListAttempt(category, subcategory, userAddress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorList);
