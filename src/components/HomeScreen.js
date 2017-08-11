import React, { Component } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import Fab from './Fab';
import PricePrediction from './PricePrediction';
import { NavIcon } from './functionalComponents';
import {
    getUserPosition,
    getUserFavoriteGas,
    getUserTankCapacity,
    getUserFavoriteArea
} from '../actions';
import { COLOR_PRIMARY, COLOR_FONT_QUINARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

class HomeScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '홈',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='home' style={[Styles.tabBarIcon, { color: tintColor }]} />
        ),
        headerStyle: Styles.headerBackgroundPrimary,
        headerTitle: <Image source={require('../img/icon/logo_type_white.png')} style={Styles.headerImageTitle} />,
        headerRight: <NavIcon iconName="share" color={COLOR_FONT_QUINARY} />
    };

    componentDidMount() {
        this.props.getUserPosition();
        this.props.getUserFavoriteGas();
        this.props.getUserTankCapacity();
        this.props.getUserFavoriteArea();
    }

    shouldComponentUpdate() {
        const { errorLocation, loadingLocation, userAllowLocation } = this.props.userGlobalState;

        return errorLocation !== null && !loadingLocation && userAllowLocation;
    }

    render() {
        const { containerStyle, linearGradientStyle } = styles;
        const { navigate } = this.props.navigation;

        return (
            <View style={containerStyle}>
                <StatusBar
                    backgroundColor={COLOR_PRIMARY}
                />
                <LinearGradient colors={[COLOR_PRIMARY, '#53a0fe', '#40bbef']} style={linearGradientStyle}>
                    <PricePrediction />
                    <Fab navigate={navigate} />
                </LinearGradient>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    linearGradientStyle: {
        flex: 1
    }
};

const mapStateToProps = state => {
    return { userGlobalState: state.userState };
};

export default connect(mapStateToProps,
    {
        getUserPosition,
        getUserFavoriteGas,
        getUserTankCapacity,
        getUserFavoriteArea
    }
    )(HomeScreen);