import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import SettingsCard from '../../Components/SettingsCard';
import ReduxActions from '../../Redux/Actions';

class Settings extends Component {
  render() {
    const { pushNotifications } = this.props.settings;

    return (
      <View style={{ paddingTop: 80 }}>
        <SettingsCard
          title={"Push Notification"}
          icon={"ios-notifications-outline"}
          hasSwitch
          toggleValue={pushNotifications}
          onPress={() => false}
        />

        <SettingsCard
          title={"Profile"}
          icon={"ios-contact"}
        />

        <SettingsCard
          title={"Change Password"}
          icon={"ios-key"}
        />

        <SettingsCard
          title={"Log out"}
          icon={"ios-log-out"}
        />

        <Text style={{ paddingTop: 30, fontWeight: '500', paddingLeft: 8, paddingBottom: 5, fontSize: 15 }}>
          Legal
        </Text>

        <SettingsCard
          title={"Terms of Use"}
          icon={"md-bookmarks"}
        />

        <SettingsCard
          title={"Privacy Policy"}
          icon={"md-lock"}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
