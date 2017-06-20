import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavIcon = ({ iconName, onPress, color }) => {
    const { containerStyle, iconStyle } = styles;

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Icon
                name={iconName}
                style={[iconStyle, { color: color }]}
            />
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        alignSelf: 'center',
        padding: 15
    },
    iconStyle: {
        fontSize: 20
    }
};

export { NavIcon };
