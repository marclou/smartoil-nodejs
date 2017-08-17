import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

import { Spinner } from './functionalComponents';
import GasStationList from './GasStationList';
import { COLOR_FONT_SECONDARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

class Result extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '내 위치로 검색',
        headerTintColor: COLOR_FONT_SECONDARY,
        headerTitleStyle: Styles.headerTitleDark,
        headerStyle: [Styles.headerBackgroundDark, { shadowOpacity: 0 }]
    };

    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    render() {
        const { containerStyle } = styles;
        const { navigate } = this.props.navigation;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <View style={containerStyle} >
                <GasStationList navigate={navigate} />
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
