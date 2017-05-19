import {
    RECEIVE_LOCATION,
    ERROR_LOCATION,
    CHANGE_USER_ALLOW_LOCATION
} from '../actions/type';

const INITIAL_STATE = {
    userAllowLocation: false
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
        default:
            return state;
    }
};
