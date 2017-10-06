import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    COLOR_PRIMARY,
    COLOR_FONT_QUINARY,
} from '../../styles/common';

const ClickableTag = ({ iconName, onPress }) => {
    const { containerStyle, iconStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={containerStyle}>
                <Icon name={iconName} style={iconStyle} />
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        margin: 4,
        alignSelf: 'center',
        backgroundColor: COLOR_PRIMARY,
        padding: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: COLOR_FONT_QUINARY
    },
    iconStyle: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontSize: 14,
        color: COLOR_FONT_QUINARY
    }
};

export { ClickableTag };
