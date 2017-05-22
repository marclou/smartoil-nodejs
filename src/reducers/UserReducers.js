import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    CHANGE_USER_ALLOW_LOCATION,
    RECEIVE_USER_FAVORITE_GAS,
    CHANGE_USER_FAVORITE_GAS
} from '../actions/type';

const INITIAL_STATE = {
    userAllowLocation: false,
    userFavoriteGas: 'Gasoline'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RECEIVE_LOCATION:
            return {
                ...state,
                userLocation: action.payload.userCoordinates,
                userAllowLocation: action.payload.userAllowLocation
            };
        case ERROR_LOCATION:
            return {
                ...state,
                error: action.payload.error,
                userAllowLocation: false
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
        case CHANGE_USER_FAVORITE_GAS:
            return {
                ...state,
                userFavoriteGas: action.payload
            };
        default:
            return state;
    }
};
