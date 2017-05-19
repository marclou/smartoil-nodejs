import {
    RECEIVE_LOCATION,
    ERROR_LOCATION
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
        default:
            return state;
    }
};
