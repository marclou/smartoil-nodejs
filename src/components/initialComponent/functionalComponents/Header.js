import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY } from '../../../styles/common';

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
        marginBottom: 20
    },
    titleStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: COLOR_TEXT_PRIMARY
    },
    descriptionStyle: {
        marginHorizontal: 30,
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'center',
        color: COLOR_TEXT_SECONDARY
    }
};

export { Header };
