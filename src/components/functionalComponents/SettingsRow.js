import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_BORDER_SECONDARY,
    COLOR_FONT_SECONDARY,
    FONT_CHARACTER_REGULAR
} from '../../styles/common';

const SettingsRow = ({ title, onPress, value }) => {
    const { containerStyle, textStyle, valueStyle, iconStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={containerStyle}>
                <Text style={textStyle}> {title} </Text>
                <Text style={valueStyle}> {value} </Text>
                <Icon name='chevron-right' style={iconStyle} />
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER_SECONDARY,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textStyle: {
        flex: 1,
        alignSelf: 'center',
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_REGULAR
    },
    valueStyle: {
        flex: 1,
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_REGULAR,
        textAlign: 'right',
        paddingRight: 25,
        alignSelf: 'center'
    },
    iconStyle: {
        alignSelf: 'center',
        fontSize: 15,
        color: COLOR_FONT_SECONDARY
    }
};

export { SettingsRow };
