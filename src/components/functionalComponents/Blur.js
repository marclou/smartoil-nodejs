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
        height: height * 3,
        width: width * 3,
        backgroundColor: 'black',
        opacity: 0.7,
    }
};

export { Blur };
