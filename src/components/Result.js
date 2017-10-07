import React, { Component } from 'react';
import { View } from 'react-native';

import GasStationList from './GasStationList';
import { COLOR_FONT_SECONDARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

class Result extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '내 위치로 검색',
        headerTintColor: COLOR_FONT_SECONDARY,
        headerTitleStyle: Styles.headerTitleDark,
        headerStyle: [Styles.headerBackgroundDark, { shadowOpacity: 0, elevation: 0 }]
    };

    render() {
        const { containerStyle } = styles;
        const { navigate, state } = this.props.navigation;
        let isFromAreaList = false;

        if (state.params.isFromAreaList) {
            isFromAreaList = true;
        }
        return (
            <View style={containerStyle} >
                <GasStationList navigate={navigate} isFromAreaList={isFromAreaList} />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    }
};

export default Result;
