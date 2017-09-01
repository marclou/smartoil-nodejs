import {
    PREDICTION_FETCHING,
    PREDICTION_FETCH_SUCCESS,
    PREDICTION_FETCH_ERROR
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    pricePredictionData: [],
    error: false,
    errorCode: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PREDICTION_FETCHING:
            return {
                ...state,
                loading: true
            };
        case PREDICTION_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                pricePredictionData: action.payload,
                error: false,
                errorCode: null
            };
        case PREDICTION_FETCH_ERROR:
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
