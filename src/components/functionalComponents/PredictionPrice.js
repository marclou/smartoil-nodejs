import React from 'react';
import { View, Text } from 'react-native';
import { COLOR_FONT_PRIMARY, COLOR_FONT_SECONDARY } from '../../styles/common';

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
        flexDirection: 'row',
        paddingLeft: 5
    },
    priceStyle: {
        alignSelf: 'flex-end',
        fontSize: 60,
        fontWeight: '300',
        color: COLOR_FONT_PRIMARY,
        paddingRight: 10,
    },
    priceInfoStyle: {
        fontSize: 12,
        color: COLOR_FONT_SECONDARY,
        alignSelf: 'flex-end',
        paddingBottom: 10
    }
};

export { PredictionPrice };
