import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { SearchButton } from './functionalComponents';

class Welcome extends Component {
    componentWillMount() {
        this.state = {
            userCoordinates: {
                latitude: null,
                longitude: null,
            },
            error: null,
            buttonDisabled: false
        };
    }

    onButtonPress(researchType) {
        /**
         * ButtonClicked is used to blind the button whether user has already clicked the button
         */
        if (!this.state.buttonDisabled) {
            this.setState({ buttonDisabled: true });
            switch (researchType) {
                case 'LOCATION':
                    this.getUserPosition();
                    break;
                case 'AREA_LIST':
                    this.setState({ buttonDisabled: false });
                    return Actions.areaList();
                default:
                    this.setState({ buttonDisabled: false });
                    return Actions.areaList();
            }
        }
    }

    /**
     * See react native official documentation for this.
     * To allow permission on Android, don't forget to go to android/app/src/main/AndroidManifest.xml
     * and add : <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
     * @returns {Promise}
     */
    getUserPosition() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    userCoordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    error: null,
                });
                this.setState({ buttonDisabled: false });
                Actions.result({ coords: this.state.userCoordinates });
            },
            (error) => {
                this.setState({
                    error: error.message
                });
                this.setState({ buttonDisabled: false });
                this.displayAlert('Alert', this.state.error, error);
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
        );
    }

    displayAlert(alertTitle, alertMessage, error) {
        Alert.alert(
            alertTitle,
            alertMessage,
            [{ text: 'OK', onPress: () => console.log(error) }],
            { cancelable: false }
        );
    }

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle} >
                <SearchButton onPress={this.onButtonPress.bind(this, 'LOCATION')} icon={'pin'} >
                    Use location
                </SearchButton>
                <SearchButton onPress={this.onButtonPress.bind(this, 'AREA_LIST')} icon={'list'} >
                    Search by area
                </SearchButton>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'space-around'
    }
};

export default Welcome;
