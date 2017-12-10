import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import ReduxActions from '../../Redux/Actions';

class VendorList extends Component {

  componentWillMount() {
    const { category, subcategory } = this.props;

    this.props.getVendorList(category, subcategory);
  }

  render() {
    return (
      <View style={{ paddingTop: 100, paddingLeft: 50 }}>
        <View>
          <Text>Unfinished page</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state.home;

  return {
    category: search.category.category,
    subcategory: search.subcategory[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVendorList: (category, subcategory) =>
      dispatch(ReduxActions.homeGetVendorListAttempt(category, subcategory)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorList);
