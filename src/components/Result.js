import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

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
        const { containerStyle, predictionStyle, gasStationsListStyle } = styles;
        const { coords } = this.props;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <View style={containerStyle} >
                <PricePrediction
                    style={predictionStyle}
                    coords={coords}
                />
                <GasStationList
                    style={gasStationsListStyle}
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
