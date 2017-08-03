import React, { Component } from 'react';
import { View, Text, Share } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { pricePredictionFetch } from '../actions';
import { Tag, Spinner, PredictionPrice, NavIcon } from './functionalComponents';
import {
    COLOR_BORDER_SECONDARY,
    COLOR_FONT_QUINARY,
    PADDING_BOTTOM,
    FONT_CHARACTER_REGULAR,
    FONT_CHARACTER_BOLD
} from '../styles/common';

class PricePrediction extends Component {
    componentDidMount() {
        Actions.refresh({
            renderRightButton: () => <NavIcon iconName="share" color={COLOR_FONT_QUINARY} onPress={this.shareContent} />
        });
    }

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

    shareContent() {
        Share.share({
                message: '스마트오일 덕분에 이 주에 기름값을 XX원 절약할 수 있었어요!  얼마나 아낄 수 있는지 알아볼까요?',
                title: '스마트오일',
                url: 'http://nsjtech.com'
            },
            {
                dialogTitle: '공유하기',
                tintColor: 'green'
            })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    renderPricePredictionOrSpinner() {
        const { loading, pricePredictionData } = this.props.pricePrediction;

        if (loading) {
            return <Spinner size='large' color='white' />;
        }

        // TO BE REMOVED WHEN PRICE PREDICTION API IS READY
        Object.assign(pricePredictionData, { predictPrice: 1250 }, { shortText: 'Buy !' }, { longText: 'Prices will increase tomorrow, you should refill your tank now.' });
        const { containerStyle, row, advice, subAdvice } = styles;
        const { userFavoriteGas, userFavoriteArea } = this.props.userState;

        return (
            <View style={containerStyle}>
                <View style={row}>
                    <Text style={advice}>
                        이제 구매해야 이제.
                    </Text>
                </View>
                <View style={row}>
                    <Text style={subAdvice}>
                        이제 구매해야.
                    </Text>
                </View>
                <View style={row}>
                    <PredictionPrice text="1,567.09" />
                </View>
                <View style={row}>
                    <Tag text={userFavoriteGas.value} />
                    <Tag text={userFavoriteArea} />
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, paddingBottom: PADDING_BOTTOM }}>
                {this.renderPricePredictionOrSpinner()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        marginBottom: 50
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    advice: {
        color: COLOR_FONT_QUINARY,
        fontSize: 20,
        fontFamily: FONT_CHARACTER_BOLD,
        letterSpacing: 1.5
    },
    subAdvice: {
        color: COLOR_FONT_QUINARY,
        fontSize: 18,
        fontFamily: FONT_CHARACTER_REGULAR,
        letterSpacing: 2

    }
};

const mapStateToProps = state => {
    return {
        pricePrediction: state.pricePrediction,
        userState: state.userState
    };
};

export default connect(mapStateToProps, { pricePredictionFetch })(PricePrediction);
