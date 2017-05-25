import { AsyncStorage, Alert } from 'react-native';

import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    FETCHING_LOCATION,
    CHANGE_USER_ALLOW_LOCATION,
    RECEIVE_USER_FAVORITE_GAS
} from './type';

// Action Creator for updating the location
const userLocationAction = (lat, long) => {
    return {
        type: RECEIVE_LOCATION,
        payload: {
            userCoordinates: {
                latitude: lat,
                longitude: long
            },
            userAllowLocation: true
        }
    };
};

// Action Creator for blinding any access to location changement
const userFetchingLocation = () => {
    return {
        type: FETCHING_LOCATION
    };
};

// Action Creator for adding error message if error happened while retrieving user location
const userLocationErrorAction = (error) => {
    return {
        type: ERROR_LOCATION,
        payload: error
    };
};

const userAllowLocationAction = (value) => {
    return {
        type: CHANGE_USER_ALLOW_LOCATION,
        payload: value
    };
};

// Display error message
const displayAlert = (alertTitle, alertMessage, error) => {
    Alert.alert(
        alertTitle,
        alertMessage,
        [{ text: 'OK', onPress: () => console.log(error) }],
        { cancelable: false }
    );
};

// Action Creator for updating the user Favorite Gas
const userFavoriteGasAction = favoriteGas => {
    return {
        type: RECEIVE_USER_FAVORITE_GAS,
        payload: favoriteGas
    };
};

// Options for the getCurrent position function (while looking for user real time position
const locationOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 20000
};

export const getUserPosition = () => {
    return (dispatch) => {
        // Unable any access to location switching
        dispatch(userFetchingLocation());
        /* global navigator */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                return dispatch(userLocationAction(position.coords.latitude, position.coords.longitude));
            },
            (error) => {
                displayAlert('Alert', error.message, error);
                return dispatch(userLocationErrorAction(error.message));
            },
            locationOptions
        );
    };
};

export const changeUserAllowLocation = value => {
    return (dispatch) => {
        if (value === true) {
            return dispatch(userAllowLocationAction(!value));
        }
        dispatch(getUserPosition());
    };
};

export const getUserFavoriteGas = () => {
    return (dispatch) => {
        AsyncStorage.getItem('gasTypePreference').then((userFavoriteGas) => {
            if (userFavoriteGas !== null) {
                return dispatch(userFavoriteGasAction(userFavoriteGas));
            }
        }).catch(error => {
            console.log(error);
        });
    };
};

export const changeUserFavoriteGas = selectedGasType => {
    return (dispatch) => {
        AsyncStorage.setItem('gasTypePreference', selectedGasType).then(() => {
            return dispatch(userFavoriteGasAction(selectedGasType));
        }).catch(error => {
            console.log(error);
        });
    };
};
