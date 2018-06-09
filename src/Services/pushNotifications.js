import { Platform } from 'react-native';

import fcm, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import { Actions } from 'react-native-router-flux';

import { showToast } from './helpers';

export function registerNotificationListener() {
  fcm.requestPermissions();

  fcm.getFCMToken();

  if (Platform.OS === 'ios') {
    fcm.getAPNSToken();
  }

  fcm.getInitialNotification().then(notification => {
    // console.log("INTIIAL");
    // console.log(notification);
  });

  fcm.on(FCMEvent.Notification, notification => {
    console.log(notification);
    if (notification.opened_from_tray) {
      const targetScreen = notification["gcm.notification.targetScreen"];
      const transactionUID = notification["gcm.notification.transactionUID"];

      if (targetScreen) {
        if (targetScreen === 'requests') {
          Actions.requestPage({ transactionUID });
        } else if (targetScreen === 'reviews') {
          Actions.requestPage({ reviewTransactionUID: transactionUID });
        }
      }
    } else if (notification["gcm.notification.targetScreen"] === 'reviews') {
      showToast("Service is complete!");
      Actions.home();
    }

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
  });

  fcm.on(FCMEvent.RefreshToken, token => {
    // console.log("REFRESH");
    // console.log(token);
  });
}
