import React from 'react';
import { View, Dimensions } from 'react-native';

const Blur = () => {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle} />
        );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = {
    containerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width,
        backgroundColor: 'black',
        opacity: 0.7,
        elevation: 1,
        zIndex: 100002
    }
};

export { Blur };
