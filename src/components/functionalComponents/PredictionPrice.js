import React from 'react';
import { View, Text } from 'react-native';
import { COLOR_FONT_QUINARY } from '../../styles/common';

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
        fontSize: 55,
        fontWeight: '300',
        color: COLOR_FONT_QUINARY,
        paddingVertical: 5
    },
    priceInfoStyle: {
        fontSize: 12,
        color: COLOR_FONT_QUINARY,
        alignSelf: 'center'
    }
};

export { PredictionPrice };
