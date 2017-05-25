import React from 'react';
import { View, Text } from 'react-native';

const AreaRow = (props) => {
    const { containerStyle, textStyle } = styles;

    return (
        <View style={containerStyle} >
            <Text style={textStyle}>
                {props.name}
            </Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        marginLeft: 12,
        fontSize: 16
    }
};

export { AreaRow };
