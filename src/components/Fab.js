import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Alert, Linking } from 'react-native';

import { Blur } from './functionalComponents';
import {
    COLOR_PRIMARY,
    COLOR_FONT_SECONDARY,
    COLOR_FONT_QUINARY,
    FONT_CHARACTER_REGULAR
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
        const { navigate } = this.props;

        this.props.getUserPosition()
            .then(() => navigate('Result'))
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
        const { navigate } = this.props.navigation;

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
            return navigate('Result');
        }
    }

    render() {
        const { actionButtonIconStyle, actionButtonItemIconStyle, textStyle, textContainerStyle, shadowStyle } = styles;
        const { navigate } = this.props;

        return (
            <ActionButton
                buttonColor={COLOR_FONT_QUINARY}
                icon={<Icon name='search' style={actionButtonIconStyle} />}
                offsetY={70}
                degrees={0}
                backdrop={<Blur />}
                useNativeFeedback={false}
            >
                <ActionButton.Item
                    title='내 위치로 검색'
                    onPress={this.searchByLocation.bind(this)}
                    textContainerStyle={textContainerStyle}
                    textStyle={textStyle}
                    spaceBetween={10}
                    useNativeFeedback={false}
                    hideLabelShadow={true}
                >
                    <Icon
                        name='map-marker'
                        style={actionButtonItemIconStyle}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    title='지역으로 검색'
                    onPress={() => navigate('AreaList')}
                    textContainerStyle={textContainerStyle}
                    textStyle={textStyle}
                    spaceBetween={10}
                    useNativeFeedback={false}
                    hideLabelShadow={true}

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
        flex: 1,
        color: COLOR_FONT_QUINARY,
        fontSize: 16,
        fontFamily: FONT_CHARACTER_REGULAR,
        letterSpacing: 0
    },
    textContainerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        height: undefined,
        shadowOpacity: 0,
        shadowOffset: { height: 0, width: 0 }
    },
    shadowStyle: {
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.5,

    }

};

const mapStateToProps = state => {
    return { userState: state.userState };
};

export default connect(mapStateToProps, { getUserPosition, changeUserAllowLocation })(Fab);
