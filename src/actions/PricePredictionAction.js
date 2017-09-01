import axios from 'axios';

import { SERVER_URL } from '../Api';
import {
    PREDICTION_FETCHING,
    PREDICTION_FETCH_SUCCESS,
    PREDICTION_FETCH_ERROR
} from './type';

const pricePredictionFetchAction = (prediction) => {
    return {
        type: PREDICTION_FETCH_SUCCESS,
        payload: prediction
    };
};

const pricePredictionFetchError = (errorCode) => {
    return {
        type: PREDICTION_FETCH_ERROR,
        payload: errorCode
    };
};

export const pricePredictionFetch = (areaCode, gasType) => {
    return (dispatch) => {
        dispatch({ type: PREDICTION_FETCHING });

        return axios.get(`${SERVER_URL}/prediction?cityDo=${areaCode}`).then(
            response => {
                switch (gasType) {
                    case 'B027':
                        return dispatch(pricePredictionFetchAction(response.data.gasoline));
                    case 'D047':
                        return dispatch(pricePredictionFetchAction(response.data.diesel));
                    case 'BO34':
                        return dispatch(pricePredictionFetchAction(response.data.premiumGasoline));
                    case 'K015':
                        return dispatch(pricePredictionFetchAction(response.data.LPG));
                    default:
                        return dispatch(pricePredictionFetchAction(response.data.gasoline));
                }
            },
            error => {
                return dispatch(pricePredictionFetchError(error.request.status));
            });
    };
};
