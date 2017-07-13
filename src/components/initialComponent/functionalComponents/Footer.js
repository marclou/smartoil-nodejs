import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';

import {
    COLOR_PRIMARY,
    COLOR_FONT_QUINARY,
    FONT_CHARACTER_BOLD
} from '../../../styles/common';

const Footer = ({ onPress, text }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={containerStyle}>
                <Text style={textStyle}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');

const styles = {
    containerStyle: {
        width: width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_PRIMARY
    },
    textStyle: {
        color: COLOR_FONT_QUINARY,
        fontFamily: FONT_CHARACTER_BOLD,
        fontSize: 18
    }
};

export { Footer };
