import React from 'react';
import { View, Platform, Text } from 'react-native';

import { COLOR_BACKGROUND_PRIMARY } from '../../styles/common';
import SaveIcon from '../SaveIcon';
import { NavIcon } from '../functionalComponents';

const Header = ({ title, gasStation }) => {
    const { containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text>{title}</Text>
            <SaveIcon gasStation={gasStation} />
            <NavIcon iconName="share" />
        </View>
    );
};

const margin = 22;

const styles = {
    containerStyle: {
        borderBottomWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: COLOR_BACKGROUND_PRIMARY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: margin,
        ...Platform.select({
            ios: {
                height: margin + 42,
            },
            android: {
                height: margin + 32,
            },
        })
    },

};

export { Header };
