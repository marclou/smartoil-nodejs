import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    FETCHING_LOCATION,
    CHANGE_USER_ALLOW_LOCATION,
    RECEIVE_USER_FAVORITE_GAS
} from '../actions/type';

const INITIAL_STATE = {
    errorLocation: false,
    userAllowLocation: true,
    loadingLocation: false,
    userLocation: {
        latitude: null,
        longitude: null
    },
    userFavoriteGas: 'Gasoline',
    userTankCapacity: '50'
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
                loadingLocation: false
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
        default:
            return state;
    }
};
