import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';

import { pricePredictionFetch } from '../actions';
import { Spinner, MainResult, PriceResult, InfoResult } from './functionalComponents';

class PricePrediction extends Component {
    componentWillMount() {
        const { latitude, longitude } = this.props.coords;

        this.state = {
            fadeAnim: new Animated.Value(0),          // Initial value for opacity: 0
        };

        this.props.pricePredictionFetch(latitude, longitude);
    }

    componentDidMount() {
        Animated.timing(                            // Animate over time
            this.state.fadeAnim,                      // The animated value to drive
            {
                toValue: 1,
                duration: 1000
            }
        ).start();                                  // Starts the animation
    }

    renderPricePredictionOrSpinner() {
        const { loading, pricePredictionData } = this.props.pricePrediction;

        if (loading) {
            return <Spinner size='large' />;
        }
        // TO BE REMOVED WHEN PRICE PREDICTION API IS READY
        Object.assign(pricePredictionData, { predictPrice: 1250 }, { shortText: 'Buy !' }, { longText: 'Prices will increase tomorrow, you should refill your tank now.' });
        const { resultContainerStyle } = styles;

        return (
            <Animated.View style={{ ...resultContainerStyle, opacity: this.state.fadeAnim }}>
                <MainResult text={pricePredictionData.shortText} />
                <PriceResult text={pricePredictionData.predictPrice} />
                <InfoResult text={pricePredictionData.longText} />
            </Animated.View>
        );
    }

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle} >
                {this.renderPricePredictionOrSpinner()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    resultContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#00cc99'
    }
};

const mapStateToProps = state => {
    return { pricePrediction: state.pricePrediction };
};

export default connect(mapStateToProps, { pricePredictionFetch })(PricePrediction);
