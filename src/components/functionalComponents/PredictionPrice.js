import React from 'react';
import { View, Text } from 'react-native';
import {
    COLOR_FONT_QUINARY,
    FONT_NUMBER_REGULAR
} from '../../styles/common';

const PredictionPrice = ({ text }) => {
    const { containerStyle, priceStyle, priceInfoStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={priceStyle}>
                {text}
            </Text>
            <Text style={priceInfoStyle}>
                (원/리터)
            </Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'column'
    },
    priceStyle: {
        alignSelf: 'center',
        fontSize: 48,
        fontFamily: FONT_NUMBER_REGULAR,
        color: COLOR_FONT_QUINARY,
    },
    priceInfoStyle: {
        fontSize: 12,
        color: COLOR_FONT_QUINARY,
        alignSelf: 'center',
        fontFamily: FONT_NUMBER_REGULAR
    }
};

export { PredictionPrice };
