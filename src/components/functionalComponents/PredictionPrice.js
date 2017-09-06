import React from 'react';
import { View, Text } from 'react-native';
import AnimateNumber from 'react-native-animate-number';

import {
    COLOR_FONT_QUINARY,
    FONT_NUMBER_REGULAR
} from '../../styles/common';

const formatPrice = (price) => {
    const priceRounded = Math.round(price * 100) / 100;

    return priceRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PredictionPrice = ({ text }) => {
    const { containerStyle, priceStyle, priceInfoStyle } = styles;
    const price = Number(text);

    return (
        <View style={containerStyle}>
            <AnimateNumber
                value={price}
                style={priceStyle}
                countBy={0}
                formatter={(val) => formatPrice(val)}
            />
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
