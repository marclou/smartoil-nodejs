import React from 'react';
import { View, Text } from 'react-native';

const PriceResult = ({ text }) => {
    const { textContainer, textStyle } = styles;

    return (
        <View style={textContainer}>
            <Text style={textStyle}>
                {text} ₩
            </Text>
        </View>
    );
};

const styles = {
    textContainer: {
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    }
};

export { PriceResult };
