import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_PRIMARY } from '../../styles/common';

const NavIcon = ({ iconName }) => {
    const { containerStyle, iconStyle } = styles;

    return (
        <TouchableOpacity style={containerStyle}>
            <Icon
                name={iconName}
                style={iconStyle}
            />
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        alignSelf: 'center',
        padding: 5
    },
    iconStyle: {
        fontSize: 20,
        color: COLOR_PRIMARY
    }
};

export { NavIcon };
