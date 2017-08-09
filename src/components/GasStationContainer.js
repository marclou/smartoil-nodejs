import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFavoriteStation } from '../actions/FavoriteStationAction';
import GasStationInfo from './GasStationInfo';
import { Spinner, ErrorStatic } from './functionalComponents';

class GasStationContainer extends Component {
    componentDidMount() {
        const { userLocation, userFavoriteGas } = this.props.userState;
        const { stationUid } = this.props;

        this.props.fetchFavoriteStation(userLocation.latitude, userLocation.longitude, userFavoriteGas.code, stationUid);
    }

    render() {
        const { favoriteStation } = this.props;
        const { userLocation, userFavoriteGas } = this.props.userState;
        const { stationUid } = this.props;

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
