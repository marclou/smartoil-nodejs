import { Alert } from 'react-native';

import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    CHANGE_USER_ALLOW_LOCATION,
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

export const changeUserFavoriteGas = value => {
    return {
        type: CHANGE_USER_FAVORITE_GAS,
        payload: value
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