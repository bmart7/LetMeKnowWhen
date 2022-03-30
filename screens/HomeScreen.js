import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';
import TripsUtil from '../TripUtil';

const HomeScreen = ({ route, navigation }) => {
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (route.params?.updated) {
      console.log('fetching');
      TripsUtil.fetchTrips().then((t) => {
        console.log(t);
        setTrips(t);
        route.params.updated = false;
      });
    }
  }, [route.params?.updated]);

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
                      TripsUtil.removeTrip(index).then(() =>
                        TripsUtil.fetchTrips().then((t) => setTrips(t))
                      );
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
            <Button
              title={JSON.stringify(location)}
              onPress={() => {
                setAddress(null);
                setLocation(null);
              }}
            />
            <Button
              title="New Trip"
              onPress={() =>
                navigation.navigate('create', {
                  address: address,
                  location: location,
                })
              }
            />
          </View>
        ) : (
          <Text>Waiting</Text>
        )}
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
