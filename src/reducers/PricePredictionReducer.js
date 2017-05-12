import {
    PREDICTION_FETCHING,
    PREDICTION_FETCH_SUCCESS
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    pricePredictionData: '',
    userGasTypePreference: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PREDICTION_FETCHING:
            return { ...state, loading: true };
        case PREDICTION_FETCH_SUCCESS:
            return { loading: false, pricePredictionData: action.payload, userGasTypePreference: action.userGasTypePreference };
        default:
            return state;
    }
};
