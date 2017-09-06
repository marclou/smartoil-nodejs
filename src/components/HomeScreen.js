import React, { Component } from 'react';
import { View, Image, Share } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import PricePrediction from './PricePrediction';
import { NavIcon } from './functionalComponents';
import {
    getUserPosition,
    getUserFavoriteGas,
    getUserTankCapacity,
    getUserRangeDistance,
    getUserFavoriteArea
} from '../actions';
import { COLOR_PRIMARY, COLOR_FONT_QUINARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

const shareContent = () => {
    Share.share({
            message: '스마트오일 덕분에 이 주에 기름값을 XX원 절약할 수 있었어요!  얼마나 아낄 수 있는지 알아볼까요?',
            title: '스마트오일',
            url: 'http://nsjtech.com'
        },
        {
            dialogTitle: '공유하기',
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
};

class HomeScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '홈',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='home' style={[Styles.tabBarIcon, { color: tintColor }]} />
        ),
        headerStyle: [Styles.headerBackgroundPrimary, { shadowOpacity: 0, elevation: 0 }],
        headerTitle: <Image source={require('../img/icon/logo_type_white.png')} style={Styles.headerImageTitle} />,
        headerLeft: <View />,
        headerRight: <NavIcon iconName="share" color={COLOR_FONT_QUINARY} onPress={() => shareContent()} />
    };

    componentDidMount() {
        this.props.getUserPosition();
        this.props.getUserFavoriteGas();
        this.props.getUserTankCapacity();
        this.props.getUserFavoriteArea();
        this.props.getUserRangeDistance();
    }

    shouldComponentUpdate() {
        const { errorLocation, loadingLocation, userAllowLocation } = this.props.userGlobalState;

        return errorLocation !== null && !loadingLocation && userAllowLocation;
    }

    render() {
        const { containerStyle, linearGradientStyle } = styles;

        return (
                <View style={containerStyle}>
                    <LinearGradient colors={[COLOR_PRIMARY, '#53a0fe', '#40bbef']} style={linearGradientStyle} >
                            <PricePrediction navigation={this.props.navigation} />
                    </LinearGradient>
                </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
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
        getUserRangeDistance,
        getUserFavoriteArea
    }
    )(HomeScreen);
