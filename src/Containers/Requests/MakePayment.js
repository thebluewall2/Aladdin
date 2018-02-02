import React from 'react';
import { View, Text, TouchableOpacity, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ReduxActions from '../../Redux/Actions';
import { LoadingSpinner } from '../../Components/common';
import Config from '../../Services/config';
import styles from './Styles';

class MakePayment extends React.PureComponent {

  _renderErrorMessage = () => {
    const { errorMessage } = this.props;

    if (errorMessage) {
      return <Text style={styles.errorTextStyle}>{this.props.errorMessage}</Text>;
    }

    return false;
  }

  _renderSubmitButton = () => {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    return (
      <TouchableOpacity style={styles.selectTimeButtonStyle} onPress={this._submitPayment}>
        <Text style={styles.buttonTextStyle}>Make payment</Text>
      </TouchableOpacity>
    );
  }

  _renderCancelButton = () => {
    if (this.props.loading) {
      return false;
    }

    return (
      <TouchableOpacity style={styles.rejectServiceButtonStyle} onPress={this._cancelPayment}>
        <Text style={styles.buttonTextStyle}>Cancel</Text>
      </TouchableOpacity>
    );
  }

  _submitPayment = () => {
    this.props.makePayment(this.props.paymentInfo);
  }

  _cancelPayment = () => {
    Actions.pop();
  }

  _renderContent = () => {
    const { PaymentDesc, CustName, CustEmail, Amount, CustPhone } = this.props.paymentInfo;

    return (
      <View style={{ paddingTop: Config.navBarHeight, paddingLeft: 15, paddingRight: 15 }}>
        <Text style={styles.orderDetailsTitleTextStyle}>Confirm payment</Text>

        <Text style={styles.orderSectionTextStyle}>Description</Text>
        <Text style={styles.orderContentTextStyle}>{PaymentDesc}</Text>

        <Text style={styles.orderSectionTextStyle}>Name</Text>
        <Text style={styles.orderContentTextStyle}>{CustName}</Text>

        <Text style={styles.orderSectionTextStyle}>Email</Text>
        <Text style={styles.orderContentTextStyle}>{CustEmail}</Text>

        <Text style={styles.orderSectionTextStyle}>Phone number</Text>
        <Text style={styles.orderContentTextStyle}>{CustPhone}</Text>

        <Text style={styles.orderSectionTextStyle}>Amount (MYR)</Text>
        <Text style={styles.orderContentTextStyle}>{Amount}</Text>

        {this._renderErrorMessage()}

        <View style={styles.buttonListStyle}>
          {this._renderSubmitButton()}
          {this._renderCancelButton()}
        </View>
      </View>
    );
  }

  _renderWebView = () => {
    const { paymentInfo } = this.props;
    console.log(paymentInfo);

    return (
      <View style={{ paddingTop: Config.navBarHeight, paddingBottom: Config.tabBarHeight, flex: 1 }}>
        <WebView
          source={{
            uri: Config.getPaymentGatewayDomain,
            method: 'POST',
            body: JSON.stringify(paymentInfo)
          }}
        />
      </View>
    );
  }

  render() {
    if (this.props.launchBrowser) {
      return this._renderWebView();
    }

    return this._renderContent();
  }
}

const mapStateToProps = ({ requests }) => {
  const { loading, paymentInfo, errorMessage, launchBrowser } = requests;

  return {
    loading,
    paymentInfo,
    errorMessage,
    launchBrowser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makePayment: (paymentInfo) =>
      dispatch(ReduxActions.requestsMakePaymentAttempt(paymentInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
