import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import SearchBar from './SearchBar'

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
                {address ? <Button title={location} onPress={() => {setAddress(null)}} />: <Text>Waiting</Text>}
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