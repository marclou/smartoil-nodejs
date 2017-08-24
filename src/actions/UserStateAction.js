import { AsyncStorage } from 'react-native';

import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    FETCHING_LOCATION,
    CHANGE_USER_ALLOW_LOCATION,
    RECEIVE_USER_FAVORITE_GAS,
    RECEIVE_USER_TANK_CAPACITY,
    RECEIVE_USER_FAVORITE_AREA,
    RECEIVE_USER_IS_FIRST_LAUNCH
} from './type';

// Action Creator for updating the location
const userLocationAction = (lat, long) => {
    return {
        type: RECEIVE_LOCATION,
        payload: {
            userCoordinates: {
                latitude: lat,
                longitude: long
            }
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

// Action Creator for updating the user Favorite Gas
const userFavoriteGasAction = favoriteGas => {
    return {
        type: RECEIVE_USER_FAVORITE_GAS,
        payload: favoriteGas
    };
};

// Action Creator for updating the user Tank Capacity
const userTankCapacityAction = tankCapacity => {
    return {
        type: RECEIVE_USER_TANK_CAPACITY,
        payload: tankCapacity
    };
};

// Action Creator for updating the user Favorite Area
const userFavoriteAreaAction = favoriteArea => {
    return {
        type: RECEIVE_USER_FAVORITE_AREA,
        payload: favoriteArea
    };
};

// Action Creator for updating the user First Launch or not variable
const userIsFirstLaunchAction = value => {
    return {
        type: RECEIVE_USER_IS_FIRST_LAUNCH ,
        payload: value
    };
};

// Options for the getCurrent position function (while looking for user real time position
const locationOptions = {
    enableHighAccuracy: false,
    timeout: 6000,
    maximumAge: 20000
};

export const getUserPosition = () => {
    return (dispatch) => {
        // Unable any access to location switching
        dispatch(userFetchingLocation());
        return new Promise((resolve, reject) => {
            /* global navigator */
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve();
                    return dispatch(userLocationAction(position.coords.latitude, position.coords.longitude));
                },
                (positionError) => {
                    reject(positionError);
                    return dispatch(userLocationErrorAction(positionError.code));
                },
                locationOptions
            );
        });
    };
};

export const changeUserAllowLocation = value => {
    return {
        type: CHANGE_USER_ALLOW_LOCATION,
        payload: !value
    };
};

export const getUserFavoriteGas = () => {
    return (dispatch) => {
        AsyncStorage.getItem('gasTypePreference').then((userFavoriteGas) => {
            if (userFavoriteGas !== null) {
                return dispatch(userFavoriteGasAction(JSON.parse(userFavoriteGas)));
            }
        }).catch(error => {
            console.log(error);
        });
    };
};

export const changeUserFavoriteGas = selectedGasType => {
    return (dispatch) => {
        AsyncStorage.setItem('gasTypePreference', JSON.stringify(selectedGasType)).then(() => {
            return dispatch(userFavoriteGasAction(selectedGasType));
        }).catch(error => {
            console.log(error);
        });
    };
};

export const getUserTankCapacity = () => {
    return (dispatch) => {
        AsyncStorage.getItem('tankCapacity').then((tankCapacity) => {
            if (tankCapacity !== null) {
                return dispatch(userTankCapacityAction(parseInt(tankCapacity, 10)));
            }
        }).catch(error => {
            console.log(error);
        });
    };
};

export const changeUserTankCapacity = tankCapacity => {
    return (dispatch) => {
        AsyncStorage.setItem('tankCapacity', tankCapacity.toString()).then(() => {
            return dispatch(userTankCapacityAction(tankCapacity));
        }).catch(error => {
            console.log(error);
        });
    };
};

export const getUserFavoriteArea = () => {
    return (dispatch) => {
        AsyncStorage.getItem('favoriteArea').then((favoriteArea) => {
            if (favoriteArea !== null) {
                return dispatch(userFavoriteAreaAction(favoriteArea));
            }
        }).catch(error => {
            console.log(error);
        });
    };
};

export const changeUserFavoriteArea = favoriteArea => {
    return (dispatch) => {
        AsyncStorage.setItem('favoriteArea', favoriteArea).then(() => {
            return dispatch(userFavoriteAreaAction(favoriteArea));
        }).catch(error => {
            console.log(error);
        });
    };
};

export const changeUserIsFirstLaunch = value => {
    return (dispatch) => {
        AsyncStorage.setItem('isFirstLaunch', JSON.stringify(value)).then(() => {
            return dispatch(userIsFirstLaunchAction(value));
        }).catch(error => {
            console.log(error);
        });
    };
};
