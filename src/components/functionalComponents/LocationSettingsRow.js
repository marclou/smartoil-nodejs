import React from 'react';
import { Text, View } from 'react-native';

import {
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_BORDER_SECONDARY,
    COLOR_FONT_SECONDARY,
    FONT_CHARACTER_REGULAR
} from '../../styles/common';

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
        height: 50,
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER_SECONDARY,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textStyle: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'left',
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_REGULAR
    }
};

export { LocationSettingsRow };
