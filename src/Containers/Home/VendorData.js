import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { LoadingSpinner } from '../../Components/common';
import ReduxActions from '../../Redux/Actions';
import styles from './Styles';

class VendorData extends React.PureComponent {
    componentWillMount() {
      const { vendorID } = this.props.navigationState;

      this.props.getVendorData(vendorID);
    }

    _renderErrorMessage = (errorMsg) => {
      return (
        <Text style={styles.errorTextStyle}>
          {errorMsg}
        </Text>
      );
    }

    _handleBookNow = () => {
      Actions.chooseTime();
    }

    _renderContent = (vendorData) => {
      if (!vendorData) {
        return false;
      }

      const { companyName, address, city, name, officeNo, yearsOfCompany, yearsOfExp } = vendorData;

      return (
        <View style={{ alignSelf: 'center', justifyContent: 'space-between' }}>
          <Text>{companyName}</Text>
          <Text>{address}</Text>
          <Text>{city}</Text>
          <Text style={{ paddingTop: 10 }}>{name}</Text>
          <Text>{officeNo}</Text>
          <Text>Established for {yearsOfCompany} years</Text>
          <Text>Years of experience: {yearsOfExp}</Text>
          <TouchableOpacity onPress={this._handleBookNow} >
            <Text>Book now</Text>
          </TouchableOpacity>
        </View>
      );
    }

    render() {
      const { vendorData, errorMsg, loading } = this.props;

      if (loading) {
          return <LoadingSpinner />;
      }

      return (
        <View style={{ paddingTop: 70 }}>
          {errorMsg ?
            this._renderErrorMessage(errorMsg)
            :
            this._renderContent(vendorData)
          }
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  const { errorMsg, loading, search } = state.home;

  return {
    vendorData: search.vendorData,
    errorMsg,
    loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVendorData: (vendorID) =>
      dispatch(ReduxActions.homeGetVendorDataAttempt(vendorID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorData);
