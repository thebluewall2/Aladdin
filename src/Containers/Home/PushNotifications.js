import React from 'react';
import { Platform } from 'react-native';

import fcm, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

export default class PushNotifications extends React.PureComponent {
  componentDidMount() {
    fcm.requestPermissions();

    fcm.getFCMToken().then(token => {
      console.log(token);
    });

    if (Platform.OS === 'ios') {
      fcm.getAPNSToken();
    }

    fcm.getInitialNotification().then(notification => {
      console.log(notification);
    });

    this.notificationListener = fcm.on(FCMEvent.Notification, notification => {
      console.log(notification);

      if (Platform.OS === 'ios') {
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch (notification._notificationType) {
          case NotificationType.Remote:
            notification.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break;
          case NotificationType.NotificationResponse:
            notification.finish();
            break;
          case NotificationType.WillPresent:
            notification.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
            break;
          default:
            break;
        }
      }

      this.showLocalNotification(notification);
    });

    this.refreshTokenListener = fcm.on(FCMEvent.RefreshToken, token => {
      console.log(token);
    });
  }

  componentWillUnmount() {
    console.log("unmounting");
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }

  showLocalNotification(notification) {
    console.log(notification);
  }

  render() {
    return null;
  }
}
