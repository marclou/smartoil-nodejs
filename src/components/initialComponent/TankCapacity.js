import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';

import TankCapacityPicker from '../TankCapacityPicker';
import { Header, Footer, BackButton } from './functionalComponents';

class TankCapacity extends Component {
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
                    title='리터량 선택'
                    description='편리한 서비스 이용을 위해 처음 한번만 선택합니다. 사용하시는 자동차 리터량을 선택해주세요.'
                />
                <TankCapacityPicker />
                <Footer onPress={() => navigate('Main')} text='다음' />
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
