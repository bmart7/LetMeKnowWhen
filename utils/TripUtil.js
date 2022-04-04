import AsyncStorage from '@react-native-async-storage/async-storage';

import GeoUtil from './GeoUtil';

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
        await GeoUtil.addRegion(trips);
        await AsyncStorage.setItem(this.TRIP_KEY, JSON.stringify(trips));
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
      await GeoUtil.removeRegion(update);
      await AsyncStorage.setItem(this.TRIP_KEY, JSON.stringify(update));
      return update;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  static async killAll() {
    try {
      await GeoUtil.killAll();
      await AsyncStorage.setItem(this.TRIP_KEY, JSON.stringify([]));
    } catch (e) {
      console.warn(e);
    }
  }
}
