import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import {
    COLOR_BORDER_SECONDARY,
    COLOR_BACKGROUND_QUATERNARY
} from '../../styles/common';

const ListSection = ({ children, onPress }) => {
    const { containerStyle, viewStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={containerStyle}>
                <View style={viewStyle}>
                    {children}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY
    },
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER_SECONDARY,

    }
};

export { ListSection };
