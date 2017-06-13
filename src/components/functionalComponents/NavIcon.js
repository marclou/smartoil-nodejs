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
        flex: 1,
        alignSelf: 'center'
    },
    iconStyle: {
        fontSize: 20,
        color: COLOR_PRIMARY
    }
};

export { NavIcon };
