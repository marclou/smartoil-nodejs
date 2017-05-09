import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    gasStationsData: '',
    userGasTypePreference: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_FETCHING:
            return { ...state, loading: true };
        case DATA_FETCH_SUCCESS:
            return { loading: false, gasStationsData: action.payload, userGasTypePreference: action.userGasTypePreference };
        default:
            return state;
    }
};
