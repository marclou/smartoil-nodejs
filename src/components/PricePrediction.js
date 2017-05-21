import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { pricePredictionFetch } from '../actions';
import MainResult from './MainResult';
import PriceResult from './PriceResult';
import InfoResult from './InfoResult';
import { Spinner } from './functionalComponents';

class PricePrediction extends Component {
    componentWillMount() {
        const { latitude, longitude } = this.props.coords;

        this.props.pricePredictionFetch(latitude, longitude);
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
            <View style={resultContainerStyle}>
                <MainResult text={pricePredictionData.shortText} />
                <PriceResult text={pricePredictionData.predictPrice} />
                <InfoResult text={pricePredictionData.longText} />
            </View>
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
        backgroundColor: '#3fdc54',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1
    }
};

const mapStateToProps = state => {
    return { pricePrediction: state.pricePrediction };
};

export default connect(mapStateToProps, { pricePredictionFetch })(PricePrediction);