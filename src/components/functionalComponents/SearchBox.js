import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBox = (props) => {
    const { containerStyle, inputStyle } = styles;

    return (
        <View style={containerStyle}>
            <TextInput
                style={inputStyle}
                placeholder="Search..."
                onChangeText={() => {}}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C1C1C1',
    },
    inputStyle: {
        height: 30,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    }
};

export { SearchBox };
