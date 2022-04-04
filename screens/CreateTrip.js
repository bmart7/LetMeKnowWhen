import React, { useEffect, useState } from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContactSelector from '../components/ContactSelector';
import TripsUtil from '../utils/TripUtil';
import GeoUtil from '../utils/GeoUtil';

const CreateTrip = ({ route, navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [recipients, setRecipients] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Contacts.requestPermissionsAsync().then(
      (permission) => {
        if (permission.granted) {
          Contacts.getContactsAsync({
            fields: ['name', 'phoneNumbers', 'id'],
          }).then(
            ({ data }) => {
              console.log(data[0]);
              setContacts(
                data.filter((contact) => contact?.phoneNumbers !== null)
              );
            },
            (e) => {
              console.warn(e);
            }
          );
        }
      },
      (e) => {
        console.warn(e);
      }
    );
  }, []);

  const processAdd = () => {
    setLoading(true);
    TripsUtil.addTrip({
      address: route.params.address,
      region: { ...route.params.location, radius: GeoUtil.GEOFENCE_RADIUS },
      recipients: [...recipients],
    }).then(
      () => {
        setLoading(false);
        navigation.navigate('home', { updated: true });
      },
      (e) => {
        setLoading(false);
        console.warn(e);
      }
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'powderblue' }]}>
      <Modal visible={loading} transparent={true}>
        <View>
          <ActivityIndicator />
        </View>
      </Modal>
      {route.params?.address ? (
        <View style={styles.container}>
          <Text>{route.params.address}</Text>
          <Text>{JSON.stringify(route.params.location)}</Text>
        </View>
      ) : null}
      <View style={[styles.container, styles.inner, { flex: 5 }]}>
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>
          Who would you like to notify?
        </Text>
        <ContactSelector
          data={contacts}
          parentContainer={recipients}
          setParentContainer={setRecipients}
        />
      </View>
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            width: '90%',
            maxHeight: 75,
          },
        ]}>
        <ScrollView
          style={{ marginVertical: 5, marginRight: 5 }}
          contentContainerStyle={{ alignItems: 'center' }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <Text style={{ margin: 10, fontSize: 20 }}>
            {[...recipients].map((r) => r.name).join(', ')}
          </Text>
        </ScrollView>
        <View
          style={{
            marginVertical: 5,
            alignSelf: 'center',
            backgroundColor: 'gray',
            height: '75%',
            width: 1,
          }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Button title="Create Trip" onPress={processAdd} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inner: {
    margin: 5,
    backgroundColor: 'azure',
    width: '90%',
  },

  item: {
    width: '100%',
    padding: 10,
  },
});

export default CreateTrip;
