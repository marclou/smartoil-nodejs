import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PriceResult extends Component {
    render() {
        const { textContainer, textStyle } = styles;
        const { text } = this.props;

        return (
            <View style={textContainer}>
                <Text style={textStyle}>
                    {text} ₩
                </Text>
            </View>
        );
    }
}

const styles = {
    textContainer: {
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    }
};

export default PriceResult;
