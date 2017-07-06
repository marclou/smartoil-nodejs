import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Alert, Linking } from 'react-native';

import { Blur } from './functionalComponents';
import {
    COLOR_PRIMARY,
    COLOR_FONT_SECONDARY,
    COLOR_FONT_QUINARY
} from '../styles/common';
import { getUserPosition, changeUserAllowLocation } from '../actions';

class Fab extends Component {
    displayAlert(alertTitle, alertMessage, buttons) {
        Alert.alert(
            alertTitle,
            alertMessage,
            buttons,
            { cancelable: false }
        );
    }

    reloadLocation() {
        this.props.getUserPosition()
            .then(() => Actions.result())
            .catch((positionError) => {
                switch (positionError.code) {
                    case 0:
                        return this.displayAlert(
                            'Alert',
                            'The request failed, but the reason is not known. Please try again.',
                            [
                                { text: 'OK' }
                            ]
                        );
                    case 1:
                        return this.displayAlert(
                            'Alert',
                            'Please, turn on your GPS to access the data',
                            [
                                { text: 'Ok', onPress: () => Linking.openURL('app-settings:1') },
                                { text: 'Cancel', style: 'cancel' }
                            ]
                        );
                    case 2:
                        return this.displayAlert(
                            'Alert',
                            'It seems that you network is not stable. Please retry soon',
                            [
                                { text: 'OK' }
                            ]
                        );
                    case 3:
                        return this.displayAlert(
                            'Alert',
                            'You request timed out. Please check if you allow SmartGas to access your location.',
                            [
                                { text: 'OK' }
                            ]
                        );
                    default:
                        return this.displayAlert(
                            'Alert',
                            'An unknown problem happened.',
                            [
                                { text: 'OK' }
                            ]
                        );
                }
            });
    }

    searchByLocation() {
        const { userAllowLocation, userLocation, errorLocation } = this.props.userState;

        if (!userAllowLocation) {
            return this.displayAlert(
                'Alert',
                'Please, allow us to access your location on the setting tab.',
                [
                    { text: 'OK',
                        onPress: () => {
                            this.props.changeUserAllowLocation(userAllowLocation);
                            this.reloadLocation();
                        }
                    },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        }
        if (errorLocation) {
            this.reloadLocation();
        }
        if (userAllowLocation && userLocation.latitude !== null && userLocation.longitude !== null) {
            return Actions.result();
        }
    }

    render() {
        const { actionButtonIconStyle, actionButtonItemIconStyle, textStyle, textContainerStyle } = styles;

        return (
            <ActionButton
                buttonColor={COLOR_FONT_QUINARY}
                icon={<Icon name='search' style={actionButtonIconStyle} />}
                offsetY={70}
                degrees={90}
                outRangeScale={1.2}
                backdrop={<Blur />}
            >
                <ActionButton.Item
                    buttonColor='#EEE'
                    title='내 위치로 검색'
                    onPress={this.searchByLocation.bind(this)}
                    textContainerStyle={textContainerStyle}
                    textStyle={textStyle}
                    spaceBetween={10}

                >
                    <Icon
                        name='map-marker'
                        style={actionButtonItemIconStyle}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#EEE'
                    title='지역으로 검색'
                    onPress={() => Actions.searchArea()}
                    textContainerStyle={textContainerStyle}
                    textStyle={textStyle}
                    spaceBetween={10}
                >
                    <Icon
                        name='map-o'
                        style={actionButtonItemIconStyle}
                    />
                </ActionButton.Item>
            </ActionButton>
        );
    }
}

const styles = {
    actionButtonIconStyle: {
        fontSize: 16,
        color: COLOR_PRIMARY
    },
    actionButtonItemIconStyle: {
        fontSize: 16,
        color: COLOR_FONT_SECONDARY
    },
    textStyle: {
        color: COLOR_FONT_QUINARY,
        fontSize: 16
    },
    textContainerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0
    }

};

const mapStateToProps = state => {
    return { userState: state.userState };
};

export default connect(mapStateToProps, { getUserPosition, changeUserAllowLocation })(Fab);
