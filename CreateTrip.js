import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const [ contacts, setContacts ] = useState([]);

useEffect(() => {

},[contacts]);

const CreateTrip = (props) => {
    return (
        <View>
            <View>
                <Text>{props.destinationName}</Text>
                <Text>{props.location}</Text>
            </View>
            <View></View>
        </View>
    );
};