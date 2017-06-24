import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { pricePredictionFetch } from '../actions';
import { Tag, Spinner, PredictionPrice, PredictionIcon } from './functionalComponents';
import { COLOR_FONT_SECONDARY, COLOR_BORDER_SECONDARY } from '../styles/common';

class PricePrediction extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.userState.userLocation !== this.props.userState.userLocation) {
            return true;
        }
        return (nextProps.pricePrediction.pricePredictionData.length !== 0);
    }

    componentWillUpdate(nextProps) {
        const { latitude, longitude } = nextProps.userState.userLocation;

        if (nextProps.pricePrediction.pricePredictionData.length === 0) {
            this.props.pricePredictionFetch(latitude, longitude);
        }
    }

    renderPricePredictionOrSpinner() {
        const { loading, pricePredictionData } = this.props.pricePrediction;

        if (loading) {
            return <Spinner size='large' />;
        }

        // TO BE REMOVED WHEN PRICE PREDICTION API IS READY
        Object.assign(pricePredictionData, { predictPrice: 1250 }, { shortText: 'Buy !' }, { longText: 'Prices will increase tomorrow, you should refill your tank now.' });
        const { section, row, advice } = styles;
        const { userFavoriteGas, userFavoriteArea, userTankCapacity } = this.props.userState;

        return (
            <View>
                <View style={section}>
                    <View style={row}>
                        <PredictionIcon value="UP" />
                        <PredictionPrice text="1,567,09" />
                    </View>
                    <View style={row}>
                        <Tag text={userFavoriteGas} />
                        <Tag text={userFavoriteArea} />
                        <Tag text={`${userTankCapacity} L`} />
                    </View>
                    <View style={row}>
                        <Text style={advice}>
                            이제 구매해야.
                        </Text>
                    </View>
                </View>
                <View style={section}>
                    <Text> Hey </Text>
                </View>
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
        height: 300,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20
    },
    section: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER_SECONDARY,
        padding: 20
    },
    row: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    advice: {
        color: COLOR_FONT_SECONDARY,
        fontSize: 18
    }
};

const mapStateToProps = state => {
    return {
        pricePrediction: state.pricePrediction,
        userState: state.userState
    };
};

export default connect(mapStateToProps, { pricePredictionFetch })(PricePrediction);
