import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import TankCapacityPicker from '../TankCapacityPicker';
import { Header, Footer } from './functionalComponents';

class TankCapacity extends Component {
    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <Header
                    title='Select the liters'
                    description='Select the first time only for convenient service. Please select the amount of car you are using.'
                />
                <TankCapacityPicker />
                <Footer onPress={() => Actions.tabs({ type: ActionConst.REPLACE })} text='다음' />
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

export default TankCapacity;
