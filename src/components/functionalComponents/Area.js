import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import {
    COLOR_PRIMARY,
    COLOR_BORDER_PRIMARY,
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_FONT_QUATERNARY,
    FONT_CHARACTER_BOLD,
    FONT_CHARACTER_REGULAR
} from '../../styles/common';

const Area = ({ name, onPress, selected }) => {
    const { containerStyle, textStyle, containerSelectedStyle, textSelectedStyle } = styles;

    return (
        <TouchableOpacity
          //onPress={!selected ? onPress : null}
          onPress={onPress}
        >
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
        borderColor: COLOR_BORDER_PRIMARY,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        justifyContent: 'center',

    },
    containerSelectedStyle: {
        borderColor: COLOR_PRIMARY,
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 14,
        color: COLOR_FONT_QUATERNARY,
        fontFamily: FONT_CHARACTER_REGULAR
    },
    textSelectedStyle: {
        color: COLOR_PRIMARY,
        fontFamily: FONT_CHARACTER_BOLD
    }
};

export { Area };
