import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import {
    COLOR_FONT_PRIMARY,
    COLOR_FONT_SECONDARY,
    FONT_CHARACTER_BOLD,
    FONT_CHARACTER_REGULAR
} from '../../../styles/common';

const Header = ({ title, description }) => {
    const { containerStyle, titleStyle, descriptionStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={titleStyle}>
                {title}
            </Text>
            <Text style={descriptionStyle}>
                {description}
            </Text>
        </View>

    );
};

const { width } = Dimensions.get('window');

const styles = {
    containerStyle: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: 30
    },
    titleStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: COLOR_FONT_PRIMARY,
        fontFamily: FONT_CHARACTER_BOLD
    },
    descriptionStyle: {
        marginHorizontal: 30,
        marginVertical: 20,
        fontSize: 14,
        textAlign: 'center',
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_REGULAR
    }
};

export { Header };
