import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar'

const HomeScreen = ({ navigation }) => {
    const [ address, setAddress ] = useState(null);
    const [ location, setLocation ] = useState(null);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: "powderblue"}]}> 
            <View style={[styles.container, {width: "100%"}]} >
                <View style={[styles.inner, {height: 75, justifyContent: "center"}]}>
                    <SearchBar style={styles.item} setParentAddress={(add, loc) => {setAddress(add); setLocation(loc);}}/>
                </View>
            </View>
            <View style={[styles.container, styles.inner, {flex: 5}]}>
                {location ? <View><Button title={location} onPress={() => {setAddress(null); setLocation(null);}}/><Button title="New Trip" onPress={() => navigation.navigate('create', {address: address, location: location})}/></View> : <Text>Waiting</Text>}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    
    inner: {
        borderColor: "powderblue",
        borderWidth: 5,
        backgroundColor: "azure",
        width: "90%",
    },

    item: {
        backgroundColor: "white", 
        marginVertical: 5, 
        marginHorizontal: 10, 
        padding: 10,
    }
});

export default HomeScreen;