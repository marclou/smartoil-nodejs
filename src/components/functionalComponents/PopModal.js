import React from 'react';
import { View, Dimensions } from 'react-native';

const PopModal = ({ children }) => {
    const { containerStyle } = styles;

    return (
        <View style={containerStyle}>
            {children}
        </View>
    );
};

const { height, width } = Dimensions.get('window');

const styles = {
    containerStyle: {
        position: 'relative',
        height: height / 2,
        bottom: 0
    }

};

export { PopModal };
