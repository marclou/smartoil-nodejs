import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';

import { COLOR_PRIMARY } from '../../../styles/common';

const Footer = ({ onPress, text }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} >
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
        width: width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_PRIMARY
    },
    textStyle: {
        color: 'white',
        fontSize: 20
    }
};

export { Footer };
