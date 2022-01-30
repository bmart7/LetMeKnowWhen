import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, Image } from 'react-native';

const SelectorItem = (props) => {

    const [ selected, setSelected ] = useState(false);

    const handlePress = () => {
        const s = new Set(props.parentContainer);
        if (s.has(props.item)){
            s.delete(props.item);
        }else {
            s.add(props.item);
        }
        console.log(s);
        props.setParentContainer(s);
        setSelected(!selected);
    };

    return (
        <View style={[styles.container, {alignItems: 'flex-start'}]}>
            <Pressable onPress={handlePress} style={({pressed}) => [styles.container, {justifyContent: 'flex-start',flexDirection: 'row', backgroundColor: pressed ? 'lightgray' : 'white'}]}>
                <View style={{width: 40}}>
                    { selected && <Image style={{resizeMode: 'center', marginLeft: 5}} source={require('./tick.png')} /> }
                </View>
                <View>
                    <Text style={styles.item}>{props.item.name}</Text>
                </View>
            </Pressable>
        </View>
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
        marginVertical: 10,
        marginLeft: 5
    },
});

export default SelectorItem;