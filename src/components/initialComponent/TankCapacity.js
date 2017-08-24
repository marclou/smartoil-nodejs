import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import TankCapacityPicker from '../TankCapacityPicker';
import { Header, Footer, BackButton } from './functionalComponents';
import { changeUserIsFirstLaunch } from '../../actions';

class TankCapacity extends Component {
    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    };

    resetAction = () => {
        this.props.changeUserIsFirstLaunch(false);

        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [{ type: NavigationActions.NAVIGATE, routeName: 'Main' }],
                key: null
            })
        );
    };

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <BackButton onPress={this.goBack} />
                <Header
                    title='리터량 선택'
                    description='편리한 서비스 이용을 위해 처음 한번만 선택합니다. 사용하시는 자동차 리터량을 선택해주세요.'
                />
                <TankCapacityPicker />
                <Footer onPress={this.resetAction} text='다음' />
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

export default connect(null, { changeUserIsFirstLaunch })(TankCapacity);
