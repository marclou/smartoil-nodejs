import React from 'react';
import { Text, View } from 'react-native';

import { COLOR_FONT_SECONDARY, COLOR_BACKGROUND_SECONDARY } from '../../styles/common';

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
        margin: 5,
        alignSelf: 'center',
        backgroundColor: COLOR_BACKGROUND_SECONDARY,
        padding: 2,
        borderRadius: 3,
    },
    textStyle: {
        padding: 3,
        fontSize: 12,
        textAlign: 'center',
        color: COLOR_FONT_SECONDARY
    }
};

export { Tag };
