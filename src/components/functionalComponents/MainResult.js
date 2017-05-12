import React from 'react';
import { View, Text } from 'react-native';

const MainResult = ({ text }) => {
    const { textContainer, textStyle } = styles;

    return (
        <View style={textContainer}>
            <Text style={textStyle}>
                {text}
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
        fontSize: 40,
        fontWeight: 'bold',
        textShadowColor: '#999',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    }
};

export { MainResult };
