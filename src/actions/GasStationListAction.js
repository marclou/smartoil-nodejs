import axios from 'axios';

import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS
} from './type';
import {
    SERVER_URL,
    QUERY_LIMIT,
    DISTANCE_LIMIT
} from '../Api';

const gasStationFetchAction = (gasStationList) => {
    return {
        type: DATA_FETCH_SUCCESS,
        payload: gasStationList
    };
};

export const gasStationFetch = (latitude, longitude) => {
    return (dispatch) => {
        dispatch({ type: DATA_FETCHING });

        return axios.get(`${SERVER_URL}?latitude=${latitude}&longitude=${longitude}&limit=${QUERY_LIMIT}&km=${DISTANCE_LIMIT}`).then(
            response => {
                return dispatch(gasStationFetchAction(response.data));
            },
            error => {
                console.log(error);
            });
    };
};
