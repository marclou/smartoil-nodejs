import React from 'react';
import { Text, View } from 'react-native';

import { COLOR_TEXT_SECONDARY } from '../../styles/common';

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
        alignSelf: 'center',
        backgroundColor: '#eaeaea',
        padding: 2,
        borderRadius: 3,
    },
    textStyle: {
        padding: 2,
        fontSize: 12,
        textAlign: 'center',
        color: COLOR_TEXT_SECONDARY
    }
};

export { Tag };
