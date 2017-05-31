import {
    SELECT_FILTER
} from '../actions/type';

export default (state = 0, action) => {
    switch (action.type) {
        case SELECT_FILTER:
            return action.payload;
        default:
            return state;
    }
};
