import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_PRIMARY, COLOR_PRIMARY_OPPOSITE } from '../../styles/common';

const TabIcon = ({ iconName, selected }) => {
    const { containerStyle, colorStyle, colorSelectedStyle } = styles;

    return (
        <View style={containerStyle}>
            <Icon
                name={iconName}
                size={22}
                style={selected ? colorSelectedStyle : colorStyle}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    colorStyle: {
        color: COLOR_PRIMARY_OPPOSITE
    },
    colorSelectedStyle: {
        color: COLOR_PRIMARY
    }
};

export { TabIcon };
