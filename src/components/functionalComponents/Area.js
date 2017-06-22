import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { COLOR_PRIMARY } from '../../styles/common';

const Area = ({ name, onPress, selected }) => {
    const { containerStyle, textStyle, containerSelectedStyle, textSelectedStyle } = styles;

    return (
        <TouchableOpacity onPress={!selected ? onPress : null} >
            <View style={[containerStyle, selected && containerSelectedStyle]} >
                <Text style={[textStyle, selected && textSelectedStyle]}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        width: 100,
        height: 50,
        paddingHorizontal: 5,
        paddingVertical: 15,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#979797',
        backgroundColor: '#FFF',
        justifyContent: 'center',

    },
    containerSelectedStyle: {
        borderColor: COLOR_PRIMARY
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#979797',
    },
    textSelectedStyle: {
        color: COLOR_PRIMARY
    }
};

export { Area };
