import * as SMS from 'expo-sms';

export default class SMSUtil {
  static async requestPermissions() {
    return await SMS.isAvailableAsync();
  }

  static async sendMessage(numbers, message) {
    return await SMS.sendSMSAsync(numbers, message);
  }
}
