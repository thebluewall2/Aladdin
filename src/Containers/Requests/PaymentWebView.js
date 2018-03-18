import React from 'react';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';

import Config from '../../Services/config';

class PaymentWebView extends React.PureComponent {
  render() {
    const { paymentInfo } = this.props;

    let requestBody = '';
    for (const [key, value] of Object.entries(paymentInfo)) {
      requestBody = requestBody.concat(`${key}=${value}&`);
    }

    return (
      <View style={{ paddingTop: Config.navBarHeight, paddingBottom: Config.tabBarHeight, flex: 1 }}>
        <WebView
          source={{
            uri: Config.getPaymentGatewayDomain,
            method: 'POST',
            body: requestBody
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { paymentInfo } = state.requests;

  return {
    paymentInfo,
  };
};

export default connect(mapStateToProps)(PaymentWebView);
