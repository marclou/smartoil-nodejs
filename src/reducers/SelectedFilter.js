import {
    SELECT_FILTER,
    CLEAR_CACHE
} from '../actions/type';

export default (state = 0, action) => {
    switch (action.type) {
        case SELECT_FILTER:
            return action.payload;
        case CLEAR_CACHE:
            return 0;
        default:
            return state;
    }
};
