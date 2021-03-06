import {
    SELECT_ID,
    DESELECT_ID
} from '../actions/type';

export default (state = null, action) => {
    switch (action.type) {
        case SELECT_ID:
            return action.payload;
        case DESELECT_ID:
            return null;
        default:
            return state;
    }
};
