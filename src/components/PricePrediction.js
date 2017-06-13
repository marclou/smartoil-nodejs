import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { pricePredictionFetch } from '../actions';
import { Tag, Spinner } from './functionalComponents';
import { COLOR_PRIMARY, COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY } from '../styles/common';

class PricePrediction extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.userLocation !== this.props.userLocation) {
            return true;
        }
        return (nextProps.pricePrediction.pricePredictionData.length !== 0);
    }

    componentWillUpdate(nextProps) {
        const { latitude, longitude } = nextProps.userLocation;

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
        const { section, row, price, priceInfo, icon, advice } = styles;

        return (
            <View>
                <View style={section}>
                    <View style={row}>
                        <Icon name="caret-down" size={30} color={COLOR_PRIMARY} style={icon} />
                        <Text style={price}>
                            1,567.06
                        </Text>
                        <Text style={priceInfo}>
                            (원/리터)
                        </Text>
                    </View>
                    <View style={row}>
                        <Tag text="가솔린" />
                        <Tag text="서울" />
                    </View>
                    <View style={row}>
                        <Text style={advice}>
                            이제 구매해야.
                        </Text>
                    </View>
                </View>
                <View style={section}>
                    <Tag text="Diesiel" />
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20
    },
    section: {
        borderBottomWidth: 1,
        borderColor: '#e2e2e2',
        paddingTop: 20,
        paddingBottom: 20
    },
    row: {

        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    icon: {
        alignSelf: 'center'
    },
    price: {
        alignSelf: 'flex-end',
        fontSize: 60,
        fontWeight: '300',
        color: COLOR_TEXT_PRIMARY,
        paddingRight: 10,
        paddingLeft: 10
    },
    priceInfo: {
        fontSize: 12,
        color: COLOR_TEXT_SECONDARY,
        alignSelf: 'flex-end',
        paddingBottom: 15
    },
    advice: {
        color: COLOR_TEXT_SECONDARY,
        fontSize: 18,

    }

};

const mapStateToProps = state => {
    return {
        pricePrediction: state.pricePrediction,
        userLocation: state.userState.userLocation
    };
};

export default connect(mapStateToProps, { pricePredictionFetch })(PricePrediction);
