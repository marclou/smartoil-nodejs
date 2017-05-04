import {
    DATA_FETCHING,
    ADD_LOCATION_ACTION,
    SEARCH_LOCATION_ACTION
} from './type';

export const addFavoriteLocation = () => {
    console.log('Add favorite location action creator is called');
    return {
        type: ADD_LOCATION_ACTION,
    };
};

export const researchFavoriteLocation = () => {
    console.log('Research favorite location action creator is called');
    return {
        type: SEARCH_LOCATION_ACTION
    };
};

export const fetchingData = () => {
    console.log('Fetching datas action creator is called');
    return {
        type: DATA_FETCHING
    };
};

