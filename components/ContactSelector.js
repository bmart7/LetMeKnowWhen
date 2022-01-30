import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import SelectorItem from './SelectorItem';

const ContactSelector = (props) => {
    const [ selected, setSelected ] = useState(new Set());

    const renderItem = ({item}) => (
        <SelectorItem item={item} parentContainer={props.parentContainer && props.setParentContainer ? props.parentContainer : selected} setParentContainer={props.parentContainer && props.setParentContainer ? props.setParentContainer : setSelected}/>
    );

    const itemDivider = () => (
        <View style={{height:1, width: '100%', backgroundColor: 'gray'}} />
    );

    return (
        <FlatList
            style={{width: '100%', backgroundColor: 'azure'}}
            data={props.data}
            renderItem={renderItem}
            ItemSeparatorComponent={itemDivider}
            keyExtractor={item => item.id} />
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
        borderColor: "powderblue",
        borderWidth: 5,
        backgroundColor: "azure",
        width: "90%",
    },

    item: {
        width: '100%',
        padding: 10,
    },
});

export default ContactSelector;