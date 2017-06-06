import {
    LOAD_FAVORITES,
    ADD_FAVORITE,
    DELETE_FAVORITE
} from '../actions/type';

const INITIAL_STATE = {
    loading: true,
    favoritesList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_FAVORITES:
            return {
                ...state,
                loading: false,
                favoritesList: action.payload
            };
        case ADD_FAVORITE:
            return {
                ...state,
                favoritesList: [
                    ...state.favoritesList, action.payload
                ]
            };
        case DELETE_FAVORITE:
            const index = state.favoritesList.findIndex((station) => station.uid === action.payload);

            return {
                ...state,
                favoritesList: [
                    ...state.favoritesList.slice(0, index),
                    ...state.favoritesList.slice(index + 1)
                ]
            };
        default:
            return state;
    }
};
