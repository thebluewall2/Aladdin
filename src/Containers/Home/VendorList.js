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
    const { category, subcategory } = this.props;

    this.props.getVendorList(category, subcategory);
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

  return {
    category: search.category.category,
    subcategory: search.subcategory[0],
    vendorList: home.vendorList,
    loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVendorList: (category, subcategory) =>
      dispatch(ReduxActions.homeGetVendorListAttempt(category, subcategory)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorList);
