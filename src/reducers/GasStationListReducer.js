import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    gasStationsData: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_FETCHING:
            return { ...state, loading: true };
        case DATA_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                gasStationsData: action.payload
            };
        default:
            return state;
    }
};
