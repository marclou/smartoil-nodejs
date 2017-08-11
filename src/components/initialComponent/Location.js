import React, { Component } from 'react';
import { View } from 'react-native';

import AreaFavoriteList from '../AreaFavoriteList';
import { Header, Footer } from './functionalComponents';

class Location extends Component {
    render() {
        const { containerStyle } = styles;
        const { navigate } = this.props.navigation;

        return (
            <View style={containerStyle}>
                <Header
                    title='내 지역 선택'
                    description='편리한 서비스 이용을 위해 처음 한번만 필요합니다. 주거하시는 지역을 선택해주세요.'
                />
                <AreaFavoriteList />
                <Footer
                    onPress={() => navigate('GasType')}
                    text='다음'
                />
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

export default Location;
