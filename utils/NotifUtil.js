import notifee, { EventType } from '@notifee/react-native';

export default class NotifUtil {
  static async requestPermissions() {
    return await notifee.requestPermission();
  }

  static async createNotification(title, body) {
    return notifee.displayNotification({
      title: title,
      body: body,
    });
  }

  static async handleBackgroundNotification({ type, detail }) {
    const { notification, pressAction } = detail;
    console.log(JSON.stringify(notification));
    await notifee.cancelNotification(notification.id);
  }

  static subscribeToForegroundNotification() {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }

  static async incrementBadgeCount() {
    return notifee.incrementBadgeCount();
  }

  static async decrementBadgeCount() {
    return notifee.decrementBadgeCount();
  }
}
