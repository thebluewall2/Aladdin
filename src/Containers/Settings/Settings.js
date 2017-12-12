import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import SettingsCard from '../../Components/SettingsCard';
import ReduxActions from '../../Redux/Actions';

class Settings extends Component {

  _handleTogglePushNotifications = () => {
    const { pushNotifications } = this.props.settings;

    this.props.setPushNotifications(!pushNotifications);
  }

  _navToChangePassword = () => {
    Actions.changePasswordPage();
  }

  _navToTermsOfUse = () => {
    Actions.termsOfUse();
  }

  _navToPrivacyPolicy = () => {
    Actions.privacyPolicy();
  }

  _handleLogOut = () => {
    this.props.logout();
  }

  render() {
    const { pushNotifications } = this.props.settings;

    return (
      <View style={{ paddingTop: 80 }}>
        <SettingsCard
          title={"Push Notification"}
          icon={"ios-notifications-outline"}
          hasSwitch
          toggleValue={pushNotifications}
          onPress={this._handleTogglePushNotifications}
        />

        <SettingsCard
          title={"Profile"}
          icon={"ios-contact"}
        />

        <SettingsCard
          title={"Change Password"}
          icon={"ios-key"}
          onPress={this._navToChangePassword}
        />

        <SettingsCard
          title={"Log out"}
          icon={"ios-log-out"}
          onPress={this._handleLogOut}
        />

        <Text style={{ paddingTop: 30, fontWeight: '500', paddingLeft: 8, paddingBottom: 5, fontSize: 15 }}>
          Legal
        </Text>

        <SettingsCard
          title={"Terms of Use"}
          icon={"md-bookmarks"}
          onPress={this._navToTermsOfUse}
        />

        <SettingsCard
          title={"Privacy Policy"}
          icon={"md-lock"}
          onPress={this._navToPrivacyPolicy}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    settings: settings.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPushNotifications: (pushNotifications) =>
      dispatch(ReduxActions.settingsSetPushNotifications(pushNotifications)),
    logout: () =>
      dispatch(ReduxActions.authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
