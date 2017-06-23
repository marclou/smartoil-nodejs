import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';

import Fab from './Fab';
import PricePrediction from './PricePrediction';
import {
    getUserPosition,
    getUserFavoriteGas,
    getUserTankCapacity,
    getUserFavoriteArea
} from '../actions';

class Welcome extends Component {
    componentDidMount() {
        this.props.getUserPosition();
        this.props.getUserFavoriteGas();
        this.props.getUserTankCapacity();
        this.props.getUserFavoriteArea();
    }

    shouldComponentUpdate() {
        const { errorLocation, loadingLocation, userAllowLocation } = this.props.userGlobalState;

        return errorLocation !== null && !loadingLocation && userAllowLocation;
    }

    render() {
        const { containerStyle, sectionStyle } = styles;

        return (
            <View style={containerStyle} >
                <View style={sectionStyle}>
                    <PricePrediction />
                </View>
                <Fab />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
    },
    sectionStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
};

const mapStateToProps = state => {
    return { userGlobalState: state.userState };
};

export default connect(mapStateToProps,
    {
        getUserPosition,
        getUserFavoriteGas,
        getUserTankCapacity,
        getUserFavoriteArea
    }
    )(Welcome);
