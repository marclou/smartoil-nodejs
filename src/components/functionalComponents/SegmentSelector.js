import React from 'react';
import { View } from 'react-native';

import { COLOR_PRIMARY, COLOR_NAV_BACKGROUND } from '../../styles/common';

const SegmentSelector = ({ number, indexSelected }) => {
    const { containerStyle, selectorStyle, selectorActiveStyle } = styles;

    const segments = [];
    for (let i = 0; i < number; i++) {
        if (i === indexSelected) {
            segments.push(<View style={selectorActiveStyle} key={i} />);
        } else {
            segments.push(<View style={selectorStyle} key={i} />);
        }
    }

    return (
        <View style={containerStyle}>
            {segments}
        </View>
    );
};

const styles = {
    containerStyle: {

        flexDirection: 'row'
    },
    selectorStyle: {
        flex: 1,
        height: 6,
        backgroundColor: COLOR_NAV_BACKGROUND,
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    selectorActiveStyle: {
        flex: 1,
        height: 6,
        backgroundColor: COLOR_PRIMARY
    }
};

export { SegmentSelector };
