import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Fab from './Fab';
import PricePrediction from './PricePrediction';
import { getUserPosition, getUserFavoriteGas } from '../actions';

class Welcome extends Component {
    componentDidMount() {
        this.props.getUserPosition();
        this.props.getUserFavoriteGas();
    }

    shouldComponentUpdate() {
        const { errorLocation, loadingLocation, userAllowLocation } = this.props.userGlobalState;

        return errorLocation !== null && !loadingLocation && userAllowLocation;
    }

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle} >
                <PricePrediction />
                <Fab />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
};

const mapStateToProps = state => {
    return { userGlobalState: state.userState };
};

export default connect(mapStateToProps, { getUserPosition, getUserFavoriteGas })(Welcome);
