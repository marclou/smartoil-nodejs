import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_PRIMARY, COLOR_PRIMARY_OPPOSITE } from '../../styles/common';

const PredictionIcon = ({ value }) => {
    const { iconStyle, iconUpColor, iconDownColor } = styles;

    switch (value) {
        case 'UP':
           return <Icon name="caret-up" style={[iconStyle, iconUpColor]} />;
        case 'DOWN':
            return <Icon name="caret-down" style={[iconStyle, iconDownColor]} />;
        default:
            return <View />;
    }
};

const styles = {
    iconStyle: {
        marginLeft: -25,
        alignSelf: 'center',
        fontSize: 30,
    },
    iconUpColor: {
        color: COLOR_PRIMARY_OPPOSITE
    },
    iconDownColor: {
        color: COLOR_PRIMARY
    }
};

export { PredictionIcon };
