import React, { Component } from 'react';
import { View } from 'react-native';

import GasStationList from './GasStationList';
import PricePrediction from './PricePrediction';

class Result extends Component {
    render() {
        const { containerStyle, predictionStyle, gasStationsListStyle } = styles;
        const { coords } = this.props;

        return (
            <View style={containerStyle} >
                <PricePrediction
                    style={predictionStyle}
                    coords={coords}
                />
                <GasStationList
                    style={gasStationsListStyle}
                    coords={coords}
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
    predictionStyle: {
        flex: 1
    },
    gasStationsListStyle: {
        flex: 1
    }
};

export default Result;
