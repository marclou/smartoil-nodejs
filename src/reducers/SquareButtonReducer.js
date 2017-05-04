import {
    DATA_FETCHING,
    ADD_LOCATION_ACTION,
    SEARCH_LOCATION_ACTION
} from '../actions/type';

export const INITIAL_STATE = {
    title: 'Yongsan',
    icon: 'add',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_FETCHING:
            return {
                ...state,
                loading: true,
                title: '',
                icon: ''
            };
        case ADD_LOCATION_ACTION:
            return {
                ...state,
                loading: false,
                title: 'Add location',
                icon: 'add'
            };
        case SEARCH_LOCATION_ACTION:
            return {
                ...state,
                loading: false,
                title: 'Gangnam',
                icon: 'pin'
            };
        default:
            return state;
    }
}