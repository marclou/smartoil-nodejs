import React from 'react';
import { Text, View } from 'react-native';

import LocationPreference from '../LocationPreference';

const LocationSettingsRow = ({ title }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={textStyle}> {title} </Text>
            <LocationPreference />
        </View>
    );
};

const styles = {
    containerStyle: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: '#DDD',
        padding: 8,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textStyle: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'left'
    }
};

export { LocationSettingsRow };
