import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Alert, Linking } from 'react-native';

import { Blur } from './functionalComponents';
import { COLOR_PRIMARY } from '../styles/common';
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
        const { actionButtonIconStyle, actionButtonPopIconStyle } = styles;

        return (
            <ActionButton
                buttonColor={COLOR_PRIMARY}
                icon={<Icon name='search' style={actionButtonIconStyle} />}
                offsetY={70}
                degrees={90}
                backdrop={<Blur />}
            >
                <ActionButton.Item
                    buttonColor='#EEE'
                    title='Location'
                    onPress={this.searchByLocation.bind(this)}
                >
                    <Icon
                        name='map-marker'
                        style={actionButtonPopIconStyle}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#EEE'
                    title='Areas'
                    onPress={() => Actions.searchArea()}
                >
                    <Icon
                        name='list'
                        style={actionButtonPopIconStyle}
                    />
                </ActionButton.Item>
            </ActionButton>
        );
    }
}

const styles = {
    actionButtonIconStyle: {
        fontSize: 16,
        color: 'white',
    },
    actionButtonPopIconStyle: {
        fontSize: 16,
        color: 'black',
    }

};

const mapStateToProps = state => {
    return { userState: state.userState };
};

export default connect(mapStateToProps, { getUserPosition, changeUserAllowLocation })(Fab);
