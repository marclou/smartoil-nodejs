import React, { Component } from 'react';
import { View, Share } from 'react-native';
import { connect } from 'react-redux';

import { fetchFavoriteStation } from '../actions/FavoriteStationAction';
import GasStationInfo from './GasStationInfo';
import SaveIcon from './SaveIcon';
import { Spinner, ErrorStatic, NavIcon } from './functionalComponents';
import { COLOR_FONT_SECONDARY, COLOR_PRIMARY } from '../styles/common';

const RightIcon = ({ gasStation }) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
            <SaveIcon gasStation={gasStation} />
            <NavIcon iconName="share" color={COLOR_PRIMARY} onPress={() => shareToSocial()} />
        </View>
    );
};

const shareToSocial = () => {
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

class GasStationContainer extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,
        headerTintColor: COLOR_FONT_SECONDARY,
        headerBackTitle: null,
        headerTitle: navigation.state.params &&
            navigation.state.params.title ?
            navigation.state.params.title : '',
        headerRight:
            navigation.state.params &&
            navigation.state.params.content ?
                <RightIcon gasStation={navigation.state.params.content} /> :
                <View />
    });

    componentDidMount() {
        const { userLocation, userFavoriteGas } = this.props.userState;
        const { stationUid } = this.props.navigation.state.params;

        this.props.fetchFavoriteStation(userLocation.latitude, userLocation.longitude, userFavoriteGas.code, stationUid);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.favoriteStation !== this.props.favoriteStation) {
            this.props.navigation.setParams({
                title: nextProps.favoriteStation.title,
                content: nextProps.favoriteStation.gasStation
            });
        }
    }

    render() {
        const { favoriteStation, navigation } = this.props;
        const { userLocation, userFavoriteGas } = this.props.userState;
        const { stationUid, priceDiff, realTimeVariables } = this.props.navigation.state.params;

        if (favoriteStation.loading) {
            return <Spinner size='large' />;
        }
        if (favoriteStation.error) {
            return (
                <ErrorStatic
                    title='Ooops, something went wrong'
                    message='But no worry, you can still refresh the result with the button below'
                    onPress={this.props.fetchFavoriteStation.bind(this, userLocation.latitude, userLocation.longitude, userFavoriteGas.code, stationUid)}
                />
            );
        }
        if (favoriteStation.gasStation !== null) {
            return (
                <GasStationInfo
                    navigation={navigation}
                    gasStation={favoriteStation.gasStation}
                    priceDiff={priceDiff}
                    realTimeVariables={realTimeVariables}
                />
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        userState: state.userState,
        favoriteStation: state.favoriteGasStationList.selectedStation
    };
};

export default connect(mapStateToProps, { fetchFavoriteStation })(GasStationContainer);
