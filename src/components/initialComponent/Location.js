import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AreaFavoriteList from '../AreaFavoriteList';
import { Header, Footer } from './functionalComponents';

class Location extends Component {
    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <Header
                    title='Select your location'
                    description='It is only needed for the first time to use the convenience service. Please select a residential area.'
                />
                <AreaFavoriteList />
                <Footer onPress={() => Actions.gasType()} text='다음' />
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
