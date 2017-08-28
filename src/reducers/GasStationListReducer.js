import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR,
    CLEAR_CACHE
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    error: false,
    errorCode: null,
    gasStationsData: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_FETCHING:
            return {
                ...state,
                loading: true,
                error: false,
                errorCode: null,
            };
        case DATA_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                errorCode: null,
                gasStationsData: action.payload
            };
        case DATA_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorCode: action.payload
            };
        case CLEAR_CACHE:
            return {
                loading: true,
                error: false,
                errorCode: null,
                gasStationsData: []
            };
        default:
            return state;
    }
};
