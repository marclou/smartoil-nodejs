import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Spinner } from './functionalComponents';

class PricePrediction extends Component {
    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle} >
                <Text>
                    Hey
                </Text>
                <Text>
                    Hey
                </Text>
                <Text>
                    Hey
                </Text>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
};

export default PricePrediction;
