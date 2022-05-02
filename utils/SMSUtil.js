import * as SMS from 'expo-sms';

export default class SMSUtil {
  static async requestPermissions() {
    try {
      return await SMS.isAvailableAsync();
    } catch (e) {
      console.warn(e);
    }
  }

  static async sendMessage(numbers, message) {
    return await SMS.sendSMSAsync(numbers, message);
  }

  static async notifyRecipients(recipients) {
    return await SMSUtil.sendMessage(
      recipients.map((r) => r.phoneNumbers[0].digits),
      'Automated Message from lmkw:\n\nI have arrived at my destination'
    );
  }
}
