import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';

import GasTypePicker from '../GasTypePicker';
import { Header, Footer, BackButton } from './functionalComponents';

class GasType extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    };

    render() {
        const { containerStyle } = styles;
        const { navigate } = this.props.navigation;

        return (
            <View style={containerStyle}>
                <BackButton onPress={this.goBack} />
                <Header
                    title='기름 종류 선택'
                    description='편리한 서비스 이용을 위해 처음 한번만 선택합니다. 사용하시는 자동차 기름 종류를 선택해주세요.'
                />
                <GasTypePicker />
                <Footer onPress={() => navigate('TankCapacity')} text='다음' />
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
