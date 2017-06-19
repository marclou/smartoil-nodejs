import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { COLOR_PRIMARY } from '../../styles/common';

const Button = ({ text, onPress }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={containerStyle}>
                <Text style={textStyle}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');

const styles = {
    containerStyle: {
        width: width * 0.9,
        height: 50,
        paddingVertical: 5,
        backgroundColor: COLOR_PRIMARY,
        borderColor: COLOR_PRIMARY,
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 24,
        fontWeight: '500'
    }
};

export { Button };
