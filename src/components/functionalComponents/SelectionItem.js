import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../../styles/common';

const SelectionItem = ({ value, selected }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <View style={containerStyle} >
            <Text style={textStyle} >
                {value}
            </Text>
            <View>
                {isSelected(selected)}
            </View>
        </View>
    );
};

const isSelected = (selected) => {
    const { iconStyle } = styles;

    if (selected) {
        return (
            <Icon name='check' style={iconStyle} />
        );
    }
};


const styles = {
    containerStyle: {
        flex: 1,
        height: 50,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        color: COLOR_TEXT_SECONDARY
    },
    iconStyle: {
        fontSize: 20,
        color: COLOR_PRIMARY
    }

};


export { SelectionItem };
