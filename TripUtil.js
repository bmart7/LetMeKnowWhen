import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TripUtil {
  static TRIP_KEY = 'lmkw_trips';

  static async fetchTrips() {
    try {
      const tripsJSON = await AsyncStorage.getItem(this.TRIP_KEY);
      return tripsJSON != null ? JSON.parse(tripsJSON) : [];
    } catch (e) {
      console.warn(e);
    }
  }

  static async addTrip(trip) {
    try {
      let trips = await this.fetchTrips();
      if (trips.length < 5) {
        trips.push(trip);
        await AsyncStorage.setItem(this.TRIP_KEY, JSON.stringify(trips));
        console.log('Added Successfully');
      } else {
        throw Error('Too many Trips in Place');
      }
    } catch (e) {
      console.warn(e);
    }
  }

  static async removeTrip(index) {
    try {
      let update = await this.fetchTrips();
      update.splice(index, 1);
      await AsyncStorage.setItem(this.TRIP_KEY, JSON.stringify(update));
      return update;
    } catch (e) {
      console.warn(e);
    }
  }
}
