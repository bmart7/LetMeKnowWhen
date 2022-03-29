import React from 'react';
import { TextInput } from 'react-native';
import * as Location from 'expo-location';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const SearchBar = (props) => {
    async function handleSubmit(event){
        try {
            let address = event.nativeEvent.text;
            let location = await Location.geocodeAsync(address);
            if (location[0]){
                props.setParentAddress(address, location[0]);
            } else{
                console.log(location);
                console.warn('Address: ' + address + ' could not be located');
            }
        }
        catch (e) {
            console.warn(e);
        }
    };

    return (
        <TextInput {...props} placeholder="Enter Destination..." placeholderTextColor="gray" textContextType="fullStreetAddress" autoComplete="street-address" onSubmitEditing={handleSubmit} />
    );
};

export default SearchBar;