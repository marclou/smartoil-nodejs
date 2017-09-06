import React from 'react';
import { View, Text, Image } from 'react-native';

import {
    COLOR_FONT_SECONDARY,
    COLOR_FONT_TERCIARY,
    COLOR_BACKGROUND_TERCIARY,
    FONT_CHARACTER_BOLD,
    FONT_CHARACTER_REGULAR,
    PADDING_BOTTOM
} from '../../styles/common';
import { Button } from './Button';

const ErrorStatic = ({ title, message, onPress }) => {
    const { containerStyle, imageStyle, titleStyle, messageStyle } = styles;

    return (
        <View style={containerStyle}>
            <Image
                source={require('../../img/error.png')}
                style={imageStyle}
            />
            <Text style={titleStyle}>
                이런, 무언가 잘못 되었어요.
            </Text>
            <Text style={messageStyle}>
                하지만 걱정마세요. 아래 버튼으로 결과를 새로 고칠 수 있어요.
            </Text>
            <Button
                title='재시도'
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
        padding: 40
    },
    imageStyle: {
        marginBottom: 20,
        width: 150,
        height: 150
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
