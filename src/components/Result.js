import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';
import { connect } from 'react-redux';

import { Spinner } from './functionalComponents';
import GasStationList from './GasStationList';
import PricePrediction from './PricePrediction';

class Result extends Component {
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
        const { containerStyle, gasStationsListStyle } = styles;
        const { userCoordinates } = this.props;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <View style={containerStyle} >
                <GasStationList
                    style={gasStationsListStyle}
                    coords={userCoordinates}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column'
    },
    gasStationsListStyle: {
        flex: 1
    }
};

const mapStateToProps = state => {
    return { userCoordinates: state.userState.userLocation };
};

export default connect(mapStateToProps)(Result);
