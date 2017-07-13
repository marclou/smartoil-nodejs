import React from 'react';
import { Text, View } from 'react-native';

import {
    COLOR_FONT_SECONDARY,
    COLOR_BACKGROUND_SECONDARY,
    FONT_CHARACTER_REGULAR
} from '../../styles/common';

const Tag = ({ text }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={textStyle} >
                {text}
            </Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        margin: 4,
        alignSelf: 'center',
        backgroundColor: COLOR_BACKGROUND_SECONDARY,
        padding: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'white'
    },
    textStyle: {
        padding: 3,
        fontSize: 12,
        textAlign: 'center',
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_REGULAR,
        letterSpacing: 0.6
    }
};

export { Tag };
