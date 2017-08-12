import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFavoriteStation } from '../actions/FavoriteStationAction';
import GasStationInfo from './GasStationInfo';
import { Spinner, ErrorStatic } from './functionalComponents';
import { COLOR_PRIMARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

class GasStationContainer extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTintColor: COLOR_PRIMARY,
        headerBackTitle: null,
    };

    componentDidMount() {
        const { userLocation, userFavoriteGas } = this.props.userState;
        const { stationUid } = this.props.navigation.state.params;

        this.props.fetchFavoriteStation(userLocation.latitude, userLocation.longitude, userFavoriteGas.code, stationUid);
    }

    render() {
        const { favoriteStation } = this.props;
        const { userLocation, userFavoriteGas } = this.props.userState;
        const { stationUid, priceDiff } = this.props.navigation.state.params;

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
                    gasStation={favoriteStation.gasStation}
                    priceDiff={priceDiff}
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
