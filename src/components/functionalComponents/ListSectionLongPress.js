import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import {
    COLOR_BORDER_SECONDARY,
    COLOR_BACKGROUND_QUATERNARY
} from '../../styles/common';

const ListSectionLongPress = ({ children, onPress, onLongPress }) => {
    const { containerStyle, viewStyle } = styles;

    return (
        <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
            <View style={containerStyle} >
                <View style={viewStyle}>
                    {children}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY
    },
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 9,
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER_SECONDARY,
    }
};

export { ListSectionLongPress };
