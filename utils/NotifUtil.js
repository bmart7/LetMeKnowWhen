import notifee, { EventType } from '@notifee/react-native';
import SMSUtil from './SMSUtil';
import TripUtil from './TripUtil';

export default class NotifUtil {
  static async requestPermissions() {
    return await notifee.requestPermission();
  }

  static async createNotification(title, body, data) {
    return notifee.displayNotification({
      title: title,
      body: body,
      data: data ? data : '',
    });
  }

  static subscribeToForegroundNotification() {
    return notifee.onForegroundEvent(this.handleNotification);
  }

  static async incrementBadgeCount() {
    return await notifee.incrementBadgeCount();
  }

  static async clearBadgeCount() {
    return await notifee.setBadgeCount(0);
  }

  static async setup() {
    this.registerBackgroundEventHandler();
    await this.setCategories();
  }

  static async setCategories() {
    await notifee.setNotificationCategories([
      {
        id: 'arrived',
        actions: [
          {
            id: 'notify',
            title: 'Notify Recipients',
          },
        ],
      },
    ]);
  }

  static registerBackgroundEventHandler() {
    notifee.onBackgroundEvent(this.handleNotification);
  }

  static async handleNotification({ type, detail }) {
    const { notification, pressAction } = detail;

    if (type === EventType.ACTION_PRESS) {
      const trips = await TripUtil.fetchTrips();
      const region = JSON.parse(detail.notification.data.region);
      const index = trips.findIndex(
        (trip) =>
          trip.region.latitude == region.latitude &&
          trip.region.longitude == region.longitude
      );
      await SMSUtil.notifyRecipients(trips[index].recipients).then(
        (resp) => {
          if (resp.result != 'cancelled') TripUtil.removeTrip(index);
        },
        () => console.log('sms fail')
      );
    }
    await notifee.cancelNotification(notification.id);
  }
}
