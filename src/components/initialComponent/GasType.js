import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import GasTypePicker from '../GasTypePicker';
import { Header, Footer } from './functionalComponents';

class GasType extends Component {
    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <Header
                    title='Select oil type'
                    description='Select the first time only for convenient service. Please select the type of car oil you are using.'
                />
                <GasTypePicker />
                <Footer onPress={() => Actions.tankCapacity()} text='다음' />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

export default GasType;
