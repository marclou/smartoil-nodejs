import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLOR_FONT_PRIMARY } from '../../../styles/common';

const BackButton = ({ onPress }) => {
    const { containerStyle, iconStyle } = styles;

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress} >
            <Icon name='arrow-back' color={COLOR_FONT_PRIMARY} style={iconStyle} />
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        position: 'absolute',
        top: -65,
        left: 0,
        alignItems: 'center',
        padding: 20
    },
    iconStyle: {
        fontSize: 20
    }
};

export { BackButton };
