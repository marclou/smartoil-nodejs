import axios from 'axios';

import {
    SERVER_URL,
    QUERY_LIMIT,
    DISTANCE_LIMIT
} from '../Api';
import {
    PREDICTION_FETCHING,
    PREDICTION_FETCH_SUCCESS
} from './type';

const pricePredictionFetchAction = (prediction) => {
    return {
        type: PREDICTION_FETCH_SUCCESS,
        payload: prediction
    };
};

export const pricePredictionFetch = (latitude, longitude) => {
    return (dispatch) => {
        dispatch({ type: PREDICTION_FETCHING });

        return axios.get(`${SERVER_URL}?latitude=${latitude}&longitude=${longitude}&limit=${QUERY_LIMIT}&km=${DISTANCE_LIMIT}`).then(
            response => {
                return dispatch(pricePredictionFetchAction(response.data));
            },
            error => {
                console.log(error);
            });
    };
};
