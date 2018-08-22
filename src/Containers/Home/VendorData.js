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
        <View style={styles.vendorDataContainerViewStyle}>
          <Text style={styles.vendorDataTitleTextStyle}>
            {companyName}{"\n"}
          </Text>

          <Text style={styles.vendorDataContentTextStyle}>
            {address}
          </Text>

          <Text style={styles.vendorDataContentTextStyle}>
            {city}
          </Text>

          <Text style={styles.vendorDataTitleTextStyle}>
            {"\n"}Contact Details{"\n"}
          </Text>

          <Text style={styles.vendorDataContentTextStyle}>
            Contact person: {"\n"}{name}{"\n"}
          </Text>

          <Text style={styles.vendorDataContentTextStyle}>
            Office Number: {"\n"}{officeNo}{"\n"}
          </Text>

          <Text style={styles.vendorDataContentTextStyle}>
            Years of Company Establish: {"\n"}{yearsOfCompany} years{"\n"}
          </Text>

          <Text style={styles.vendorDataContentTextStyle}>
            Years of experience: {"\n"}{yearsOfExp}
          </Text>

          <View style={{ paddingTop: 20, alignItems: 'center' }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this._handleBookNow} >
              <Text style={styles.buttonTextStyle}>Book Now</Text>
            </TouchableOpacity>
          </View>
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
