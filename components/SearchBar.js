import React from 'react';
import { TextInput } from 'react-native';
import * as Location from 'expo-location';

const SearchBar = (props) => {
  async function handleSubmit(event) {
    try {
      let address = event.nativeEvent.text;
      if (address) {
        let location = await Location.geocodeAsync(address);
        if (location[0]) {
          props.setParentAddress(address, {
            latitude: location[0].latitude,
            longitude: location[0].longitude,
          });
        } else {
          console.warn('Address: ' + address + ' could not be located');
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <TextInput
      {...props}
      placeholder="Enter Destination..."
      placeholderTextColor="gray"
      textContextType="fullStreetAddress"
      autoComplete="street-address"
      onSubmitEditing={handleSubmit}
    />
  );
};

export default SearchBar;
