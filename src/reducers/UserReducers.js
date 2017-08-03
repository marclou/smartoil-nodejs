import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    FETCHING_LOCATION,
    CHANGE_USER_ALLOW_LOCATION,
    RECEIVE_USER_FAVORITE_GAS,
    RECEIVE_USER_TANK_CAPACITY,
    RECEIVE_USER_FAVORITE_AREA
} from '../actions/type';
import { GASOLINE } from '../Type';

const INITIAL_STATE = {
    errorLocation: null,
    userAllowLocation: true,
    loadingLocation: false,
    userLocation: {
        latitude: null,
        longitude: null
    },
    userFavoriteGas: GASOLINE,
    userTankCapacity: 50,
    userFavoriteArea: 'Seoul'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_LOCATION:
            return {
                ...state,
                loadingLocation: true
            };
        case RECEIVE_LOCATION:
            return {
                ...state,
                userLocation: action.payload.userCoordinates,
                loadingLocation: false,
                errorLocation: null
            };
        case ERROR_LOCATION:
            return {
                ...state,
                errorLocation: action.payload,
                loadingLocation: false
            };
        case CHANGE_USER_ALLOW_LOCATION:
            return {
                ...state,
                userAllowLocation: action.payload
            };
        case RECEIVE_USER_FAVORITE_GAS:
            return {
                ...state,
                userFavoriteGas: action.payload
            };
        case RECEIVE_USER_TANK_CAPACITY:
            return {
                ...state,
                userTankCapacity: action.payload
            };
        case RECEIVE_USER_FAVORITE_AREA:
            return {
                ...state,
                userFavoriteArea: action.payload
            };
        default:
            return state;
    }
};
