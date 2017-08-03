import React from 'react';
import { View, Text } from 'react-native';

import {
    COLOR_FONT_SECONDARY,
    COLOR_FONT_TERCIARY,
    COLOR_BACKGROUND_TERCIARY,
    FONT_CHARACTER_BOLD,
    FONT_CHARACTER_REGULAR
} from '../../styles/common';
import { Button } from './Button';

const ErrorStatic = ({ title, message, onPress }) => {
    const { containerStyle, titleStyle, messageStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={titleStyle}>
                {title}
            </Text>
            <Text style={messageStyle}>
                {message}
            </Text>
            <Button
                title='Retry'
                onPress={onPress}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_BACKGROUND_TERCIARY,
        paddingHorizontal: 40
    },
    titleStyle: {
        fontSize: 16,
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_BOLD,
        textAlign: 'center'
    },
    messageStyle: {
        fontSize: 12,
        color: COLOR_FONT_TERCIARY,
        fontFamily: FONT_CHARACTER_REGULAR,
        textAlign: 'center',
        paddingVertical: 15
    }
};

export { ErrorStatic };
