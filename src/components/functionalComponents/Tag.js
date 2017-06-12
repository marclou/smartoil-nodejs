import React from 'react';
import { Text, View } from 'react-native';

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
        borderWidth: 0.5,
        alignSelf: 'center',
        backgroundColor: '#CCC',
        padding: 2,
        opacity: 0.8,
        borderRadius: 2,
    },
    textStyle: {
        fontSize: 10,
        textAlign: 'center'
    }
};

export { Tag };
