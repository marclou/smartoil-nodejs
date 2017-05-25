import React from 'react';
import { View, Text } from 'react-native';

const SectionHeader = (props) => {
    const { containerStyle, textStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{props.character}</Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#EAEAEA'
    },
    textStyle: {
        fontSize: 13
    }
};

export { SectionHeader };
