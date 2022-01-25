import React from 'react';
import { TextInput } from 'react-native';
import * as Location from 'expo-location';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const SearchBar = (props) => {
    async function handleSubmit(event){
        try {
            let location = await Location.geocodeAsync(event.nativeEvent.text);
            console.log(event.nativeEvent.target.value)
            props.setParentAddress(event.nativeEvent.text, JSON.stringify(location));
        }
        catch (e) {
            console.warn("Failed to load");
        }
    };

    return (
        <TextInput {...props} placeholder="Enter Destination..." placeholderTextColor="gray" textContextType="fullStreetAddress" autoComplete="street-address" onSubmitEditing={handleSubmit} />
    );
};

export default SearchBar;