import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import {
    COLOR_PRIMARY,
    COLOR_FONT_QUINARY,
    FONT_CHARACTER_BOLD
} from '../../styles/common';

const Button = ({ title, onPress }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={containerStyle}>
                <Text style={textStyle}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');

const styles = {
    containerStyle: {
        width: width * 0.9,
        height: 50,
        paddingVertical: 5,
        backgroundColor: COLOR_PRIMARY,
        borderColor: COLOR_PRIMARY,
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        color: COLOR_FONT_QUINARY,
        fontFamily: FONT_CHARACTER_BOLD,
        fontSize: 18
    }
};

export { Button };
