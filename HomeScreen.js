import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import SearchBar from './SearchBar'

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: "powderblue"}]}> 
            <View style={[styles.container, {width: "100%"}]} >
                <View style={[styles.inner, {height: 75, justifyContent: "center"}]}>
                    <SearchBar style={styles.item}/>
                </View>
            </View>
            <View style={[styles.container, styles.inner, {flex: 5}]}>
                
            </View>
        </SafeAreaView>
    );
}

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
        padding: 10 
    }
})

export default HomeScreen;