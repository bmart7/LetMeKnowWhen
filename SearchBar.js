import React from 'react';
import { TextInput } from 'react-native';

const SearchBar = (props) => {
    return (
        <TextInput placeholder="Enter Destination..." placeholderTextColor="gray" style={props.style} />
    );
}

export default SearchBar;