import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export default class GeoUtil {
  static GEOFENCE_TASKNAME = 'lmkw_geofence';
  static GEOFENCE_RADIUS = 5;

  static LOCATION_TASKNAME = 'lmkw_location';

  static async addRegion(trips) {
    let update = trips.map((t) => t.region);
    await Location.startGeofencingAsync(this.GEOFENCE_TASKNAME, update);
  }

  static async removeRegion(trips) {
    if (trips.length > 0) {
      let update = trips.map((t) => t.region);
      await Location.startGeofencingAsync(this.GEOFENCE_TASKNAME, update);
      console.log('updated geo regions: ' + JSON.stringify(update));
    } else {
      await this.killAll();
      console.log('killed geo process');
    }
  }

  static async killAll() {
    if (await Location.hasStartedGeofencingAsync(this.GEOFENCE_TASKNAME)) {
      await Location.stopGeofencingAsync(this.GEOFENCE_TASKNAME);
    }
    if (await Location.hasStartedLocationUpdatesAsync(this.LOCATION_TASKNAME)) {
      await Location.stopLocationUpdatesAsync(this.LOCATION_TASKNAME);
    }
  }
}

TaskManager.defineTask(
  GeoUtil.GEOFENCE_TASKNAME,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      console.warn(error.message);
      return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      Alert.alert("You've entered region:" + JSON.stringify(region));
      console.log("You've entered region:", region);
    } else if (eventType === Location.GeofencingEventType.Exit) {
      Alert.alert("You've left region:" + JSON.stringify(region));
      console.log("You've left region:", region);
    }
  }
);

TaskManager.defineTask(
  GeoUtil.LOCATION_TASKNAME,
  ({ data: { locations }, error }) => {
    if (error) {
      console.warn(error.message);
      return;
    }
    console.log(new Date(Date.now()).toLocaleTimeString(), locations);
  }
);