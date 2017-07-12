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
                    title='리터량 선택'
                    description='편리한 서비스 이용을 위해 처음 한번만 선택합니다. 사용하시는 자동차 리터량을 선택해주세요.'
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
