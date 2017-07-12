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
                    title='기름 종류 선택'
                    description='편리한 서비스 이용을 위해 처음 한번만 선택합니다. 사용하시는 자동차 기름 종류를 선택해주세요.'
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
