import React from 'react';
import { View } from 'react-native';

const Blur = () => {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle} />
        );
};

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.7,
    }
};

export { Blur };
