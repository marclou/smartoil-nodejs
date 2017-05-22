import { AsyncStorage, Alert } from 'react-native';

import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    CHANGE_USER_ALLOW_LOCATION,
    RECEIVE_USER_FAVORITE_GAS,
    CHANGE_USER_FAVORITE_GAS
} from './type';

export const getUserPosition = () => {
    return (dispatch) => {
        /* global navigator */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                return dispatch({
                    type: RECEIVE_LOCATION,
                    payload: {
                        userCoordinates: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        },
                        userAllowLocation: true
                    }
                });
            },
            (error) => {
                displayAlert('Alert', error.message, error);
                return dispatch({
                   type: ERROR_LOCATION,
                    payload: error
                });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        );
    };
};

export const changeUserAllowLocation = value => {
    return (dispatch) => {
        if (value === true) {
            return dispatch({
                type: CHANGE_USER_ALLOW_LOCATION,
                payload: !value
            });
        }
        /* global navigator */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                return dispatch({
                    type: RECEIVE_LOCATION,
                    payload: {
                        userCoordinates: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        },
                        userAllowLocation: true
                    }
                });
            },
            (error) => {
                displayAlert('Alert', error.message, error);
                return dispatch({
                    type: ERROR_LOCATION,
                    payload: error
                });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        );
    };
};

export const getUserFavoriteGas = () => {
    return (dispatch) => {
        AsyncStorage.getItem('gasTypePreference').then((value) => {
            if (value !== null) {
                return dispatch({
                    type: RECEIVE_USER_FAVORITE_GAS,
                    payload: value
                });
            }
        }).catch(error => {
            console.log(error);
        });
    };
};

export const changeUserFavoriteGas = selectedGasType => {
    return (dispatch) => {
        AsyncStorage.setItem('gasTypePreference', selectedGasType).then(() => {
            return dispatch({
                type: CHANGE_USER_FAVORITE_GAS,
                payload: selectedGasType
            });
        }).catch(error => {
            console.log(error);
        });
    };
};

const displayAlert = (alertTitle, alertMessage, error) => {
    Alert.alert(
        alertTitle,
        alertMessage,
        [{ text: 'OK', onPress: () => console.log(error) }],
        { cancelable: false }
    );
};
