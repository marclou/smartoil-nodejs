import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { SearchButton } from './functionalComponents';

class Welcome extends Component {
    componentWillMount() {
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    onButtonPress(researchType) {
        switch (researchType) {
            case 'LOCATION':
                this.getUserPosition().then(() => {
                    Actions.result({ coords: this.state });
                }).catch((error) =>
                    this.displayAlert('Alert', 'Location can not be retrieve. Have a look at settings.', error));
                break;
            case 'AREA_LIST':
                return Actions.areaList();
            default:
                return Actions.result({ userCoords: this.state });
        }
    }

    /**
     * See react native official documentation for this.
     * To allow permission on Android, don't forget to go to android/app/src/main/AndroidManifest.xml
     * and add : <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
     * @returns {Promise}
     */
    getUserPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                    resolve(position);
                },
                (error) => {
                    this.setState({ error: error.message });
                    reject(error);
                    },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
            );
        });
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
