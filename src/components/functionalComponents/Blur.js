import React from 'react';
import { View, Dimensions } from 'react-native';

const Blur = () => {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        return (
            <View style={{ position: 'absolute', top: 0, left: 0, height: height, width: width, backgroundColor: 'black', opacity: 0.7, elevation: 1 }} />
        );
};

export { Blur };
