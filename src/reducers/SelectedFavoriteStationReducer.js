import {
    FAVORITE_STATION_FETCH,
    FAVORITE_STATION_FETCH_SUCCESS,
    FAVORITE_STATION_FETCH_ERROR
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    gasStation: null,
    title: '',
    error: false,
    errorCode: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FAVORITE_STATION_FETCH:
            return {
                ...state,
                loading: true
            };
        case FAVORITE_STATION_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                gasStation: action.payload,
                title: action.payload.name,
                error: false,
                errorCode: null
            };
        case FAVORITE_STATION_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorCode: action.payload
            };
        default:
            return state;
    }
};
