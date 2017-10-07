import React, { Component } from 'react';
import { View, Share, ScrollView } from 'react-native';
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
        headerTruncatedBackTitle: '뒤로 가기',
        headerTitle: navigation.state.params &&
            navigation.state.params.title ?
            navigation.state.params.title : '',
        headerRight:
            navigation.state.params &&
            navigation.state.params.content ?
                <RightIcon gasStation={navigation.state.params.content} /> :
                <View />,
        gestureResponseDistance: { horizontal: 60 }
    });

    static mapPredictionType(gasType, predictions) {
        if (predictions !== null) {
            switch (gasType) {
                case 'B027':
                    if (predictions.gasoline1Day !== null) {
                        return predictions.gasoline1Day;
                    }
                    return -1;
                case 'D047':
                    if (predictions.diesel1Day !== null) {
                        return predictions.diesel1Day;
                    }
                    return -1;
                case 'B034':
                    if (predictions.premiumGasoline1Day) {
                        return predictions.premiumGasoline1Day;
                    }
                    return -1;
                case 'K015':
                    if (predictions.lpg1Day) {
                        return predictions.lpg1Day;
                    }
                    return -1;
                default:
                    return -1;
            }
        }
        return -1;
    }

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
        const { favoriteStation, navigation, userState } = this.props;
        const { userLocation, userFavoriteGas } = userState;
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
            const predictionType = GasStationContainer.mapPredictionType(userFavoriteGas.code, favoriteStation.gasStation.predictionInfo);

            return (
                <ScrollView>
                    <GasStationInfo
                        navigation={navigation}
                        gasStation={favoriteStation.gasStation}
                        priceDiff={priceDiff}
                        realTimeVariables={realTimeVariables}
                        prediction={predictionType}
                        userState={userState}
                    />
                </ScrollView>

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
