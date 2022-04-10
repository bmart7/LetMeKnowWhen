import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import haversine from 'haversine-distance';

import SearchBar from '../components/SearchBar';
import TripUtil from '../utils/TripUtil';
import GeoUtil from '../utils/GeoUtil';
import NotifUtil from '../utils/NotifUtil';

const HomeScreen = ({ route, navigation }) => {
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [trips, setTrips] = useState([]);
  const [q, sq] = useState('before');

  useEffect(() => {
    if (route.params?.updated) {
      TripUtil.fetchTrips().then((t) => {
        setTrips(t);
        navigation.setParams({ updated: false });
      });/*
      TaskManager.getRegisteredTasksAsync().then((r) => {
        console.log('this', r);
        r ? sq(JSON.stringify(r)) : 'none';
      });*/
    }
  }, [route.params?.updated]);

  function setDistance(resp) {
    console.log(
      haversine(location, {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
      }) +
        ' - ' +
        new Date(resp.timestamp).toLocaleTimeString()
    );
  }

  useEffect(() => {
    if (location) {
      TaskManager.defineTask(
        GeoUtil.LOCATION_TASKNAME,
        ({ data: { locations }, error }) => {
          if (error) {
            console.warn(error.message);
            return;
          }
          var log = haversine({latitude: 41.9299443, longitude: -87.6534778}, {latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude}) + " - " + new Date(Date.now()).toLocaleTimeString();
          console.log(log);
          sq(log);
        }
      );
      Location.startLocationUpdatesAsync(GeoUtil.LOCATION_TASKNAME, {
        accuracy: Location.Accuracy.Highest,
      });
      return function () {
        Location.stopLocationUpdatesAsync(GeoUtil.LOCATION_TASKNAME);
      };
    }
  }, [location]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'powderblue' }]}>
      <View style={[styles.container, { width: '100%' }]}>
        <View style={[styles.inner, { height: 75, justifyContent: 'center' }]}>
          <SearchBar
            style={styles.item}
            setParentAddress={(add, loc) => {
              setAddress(add);
              setLocation(loc);
            }}
          />
        </View>
      </View>
      <View
        style={[
          styles.container,
          styles.inner,
          { justifyContent: 'flex-start', flex: 5 },
        ]}>
        <View
          style={[
            styles.container,
            {
              justifyContent: 'flex-end',
              paddingBottom: 10,
              flex: 1,
              backgroundColor: 'powderblue',
              width: '100%',
            },
          ]}>
          <Text style={{ fontSize: 20 }}>Active Trips</Text>
        </View>
        <View
          style={[
            styles.container,
            {
              justifyContent: 'flex-start',
              flex: 6,
              width: '100%',
            },
          ]}>
          {trips &&
            trips.map((trip, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: '20%',
                }}>
                <Pressable
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{trip.address}</Text>
                  <Button
                    title="delete"
                    onPress={() => {
                      TripUtil.removeTrip(index).then((t) => {
                        if (t) setTrips(t);
                      });
                    }}
                  />
                </Pressable>
              </View>
            ))}
        </View>
      </View>
      <View style={[styles.container, styles.inner, { flex: 5 }]}>
        {location ? (
          <View>
            <Text>{JSON.stringify(location)}</Text>
            <Button
              title="New Trip"
              onPress={() =>
                navigation.navigate('create', {
                  address: address,
                  location: location,
                })
              }
            />
            <Button
              title="Cancel"
              onPress={() => {
                setAddress(null);
                setLocation(null);
                sq(null);
              }}
            />
          </View>
        ) : (
          <Text>Waiting</Text>
        )}
        <Button
          title="Kill All"
          onPress={() => {
            TripUtil.killAll().then(() => {
              Alert.alert('killed');
              navigation.setParams({ updated: true });
            });
          }}
        />
        <Text>{q}</Text>
        <Button
          title="Create Notif"
          onPress={() => {
            NotifUtil.createNotification(
              'This is a notification',
              'here is the body'
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inner: {
    borderColor: 'powderblue',
    borderWidth: 5,
    backgroundColor: 'azure',
    width: '90%',
  },

  item: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
  },
});

export default HomeScreen;
