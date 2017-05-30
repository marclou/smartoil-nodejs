import {
    PREDICTION_FETCHING,
    PREDICTION_FETCH_SUCCESS
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    pricePredictionData: [],
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
                pricePredictionData: action.payload
            };
        default:
            return state;
    }
};
