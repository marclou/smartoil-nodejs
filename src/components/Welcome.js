import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Fab from './Fab';
import PricePrediction from './PricePrediction';
import {
    getUserPosition,
    getUserFavoriteGas,
    getUserTankCapacity,
    getUserFavoriteArea
} from '../actions';
import { COLOR_PRIMARY, COLOR_BACKGROUND_QUATERNARY } from '../styles/common';
import { Button } from './functionalComponents';

class Welcome extends Component {
    state = {
        modalVisible: false,
    };

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

    setModalVisible(visible) {

        this.setState({modalVisible: visible});
    }

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <PricePrediction />
                <Button
                    title='test'
                    onPress={() => console.log('pressed')}
                />
                <Fab />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
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
