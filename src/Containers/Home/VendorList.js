import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';

import { LoadingSpinner } from '../../Components/common';
import VendorCard from '../../Components/VendorCard';

class VendorList extends PureComponent {
  componentWillMount() {
    const { category, subcategory, userAddress } = this.props;

    this.props.getVendorList(category, subcategory, userAddress);
  }

  _keyExtractor = (item) => item.vendorUID;

  _renderContent = () => {
    const { loading, vendorList } = this.props;

    if (loading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <FlatList
        data={vendorList}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  _renderItem = (vendor) => {
    const { vendorUID, name, distance } = vendor.item;

    return (
      <VendorCard
        vendorUID={vendorUID}
        vendorName={name}
        distance={distance}
        onPress={(vendorID) => this._handleVendorPressed(vendorID)}
      />
    );
  }

  _handleVendorPressed = (vendorID) => {
    Actions.vendorDataPage({ vendorID });
  }

  render() {
    return (
      <View style={{ paddingTop: 100, paddingLeft: 15 }}>
        <View>
          {this._renderContent()}
        </View>
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
