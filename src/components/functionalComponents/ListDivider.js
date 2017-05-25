import React from 'react';
import { View, Text } from 'react-native';

const ListDivider = ({ title }) => {
    const { dividerContainer } = styles;

    return (
        <View style={dividerContainer} >
            <Text> {title.toUpperCase()} </Text>
        </View>
    );
};

const styles = {
    dividerContainer: {
        backgroundColor: '#EEE',
        padding: 10
    }
};

export { ListDivider };

