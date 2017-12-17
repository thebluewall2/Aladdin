import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ReduxActions from '../../Redux/Actions';

import { LoadingSpinner } from '../../Components/common';

class VendorList extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      vendorList: []
    };
  }

  componentWillMount() {
    const { category, subcategory, userAddress } = this.props;

    this.props.getVendorList(category, subcategory, userAddress);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vendorList !== this.state.vendorList) {
      this.setState({
        vendorList: nextProps.vendorList
      });
    }
  }

  _keyExtractor = (item) => item.vendorId;

  _renderContent = () => {
    const { loading } = this.props;

    if (loading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <FlatList
        data={this.state.vendorList}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  _renderItem = (item) => {
    const { vendorName } = item.item;

    return (
      <Text>{vendorName}</Text>
    );
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
  console.log(search);
  return {
    category: search.category.category,
    subcategory: search.subcategory,
    userAddress: search.userAddress,
    vendorList: home.vendorList,
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
