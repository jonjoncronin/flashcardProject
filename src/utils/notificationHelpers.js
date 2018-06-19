import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "flashCard:notifications";

/**
 * function to clear local notifications from the AsyncStorage location
 * @return {Promise} Promise returned by AsyncStorage API
 */
export function clearLocalNotification() {
  console.log("LocalNotification getting cleared.");
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

/**
 * function to return the notification object used by the Notifications package
 * @return {Object} Notification object
 */
function createNotification() {
  return {
    title: "Take a FlashQuiz!",
    body: "Don't forget to take a quiz today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

/**
 * function to set daily local notification to notify the user to take a
 * flashQuiz today.
 */
export function setLocalNotification() {
  console.log("LocalNotification getting set.");
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(13);
            tomorrow.setMinutes(30);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
