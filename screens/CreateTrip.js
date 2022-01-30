import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContactSelector from '../components/ContactSelector';

const CreateTrip = ({ route, navigation }) => {
    const [ contacts, setContacts ] = useState([]);
    const [ recipients, setRecipients ] = useState(new Set());

    useEffect(() => {
        (async () => {
            const permission = await Contacts.requestPermissionsAsync();
            console.log(permission.status);

            if (permission.granted){
                const { data } = await Contacts.getContactsAsync({
                    fields: ['name'],
                });
                setContacts(data);
            }
        })();
    },[]);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: 'powderblue'}]}>
            {route.params?.address ?
            <View style={styles.container}>
                <Text>{route.params.address}</Text>
                <Text>{route.params.location}</Text>
            </View> : null}
            <View style={[styles.container, styles.inner, {flex: 5}]}>
                <Text style={{margin: 10, fontSize: 20, fontWeight: 'bold'}}>Who would you like to notify?</Text>
                <ContactSelector data={contacts} parentContainer={recipients} setParentContainer={setRecipients}/>
            </View>
            <View style={[{flex: 1, flexDirection: 'row', width: '90%', maxHeight: 75}]}>
                <ScrollView style={{marginVertical: 5}} contentContainerStyle={{alignItems: 'center'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Text style={{margin: 10, fontSize: 20}}>{ [...recipients].map(r => r.name).join(', ') }</Text>
                </ScrollView>
                <View style={{marginVertical: 5, alignSelf: 'center', backgroundColor:'gray', height: '75%', width: 1, }}/>
                <View style={{justifyContent: 'center'}}>
                    <Button title='Create Trip' />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
    },
    
    inner: {
        margin: 5,
        backgroundColor: "azure",
        width: "90%",
    },

    item: {
        width: '100%',
        padding: 10,
    },
});

export default CreateTrip;