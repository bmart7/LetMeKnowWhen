import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import haversine from 'haversine-distance';
import NotifUtil from './NotifUtil';
import TripUtil from './TripUtil';

export default class GeoUtil {
  static GEOFENCE_TASKNAME = 'lmkw_geofence';
  static GEOFENCE_RADIUS = 150;

  static LOCATION_TASKNAME = 'lmkw_location';

  static async requestPermissions() {
    return {
      bg: await Location.requestBackgroundPermissionsAsync(),
      fg: await Location.requestForegroundPermissionsAsync(),
    };
  }

  static async updateRegions(trips) {
    activeTrips = trips.filter((t) => t.active);
    if (activeTrips.length > 0) {
      let update = activeTrips.map((t) => t.region);
      await Location.startGeofencingAsync(this.GEOFENCE_TASKNAME, update);
      console.log('updated geo regions: ' + JSON.stringify(update));
    } else {
      await this.stopLocationUpdates();
      console.log('killed geo process');
    }
  }

  static async startLocationUpdates() {
    return await Location.startLocationUpdatesAsync(this.LOCATION_TASKNAME, {
      accuracy: Location.Accuracy.Highest,
    });
  }

  static async stopLocationUpdates() {
    if (await Location.hasStartedLocationUpdatesAsync(this.LOCATION_TASKNAME)) {
      return await Location.stopLocationUpdatesAsync(this.LOCATION_TASKNAME);
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
  async ({ data: { eventType, region }, error }) => {
    if (error) {
      console.warn(error.message);
      return;
    }

    const regionStr = JSON.stringify(region);
    if (eventType === Location.GeofencingEventType.Enter) {
      NotifUtil.createNotification(
        "You've entered region:" + region.identifier,
        regionStr,
        { region: regionStr }
      );
      console.log("You've entered region:", region);
      TripUtil.inactivateTrip(region);
    } else if (eventType === Location.GeofencingEventType.Exit) {
      NotifUtil.createNotification(
        "You've left region:" + region.identifier,
        JSON.stringify(region)
      );
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
    console.log(
      haversine(
        { latitude: 41.9299443, longitude: -87.6534778 },
        {
          latitude: locations[0].coords.latitude,
          longitude: locations[0].coords.longitude,
        }
      ) +
        ' - ' +
        new Date(Date.now()).toLocaleTimeString()
    );
  }
);
