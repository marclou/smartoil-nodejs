import axios from 'axios';

import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR,
    SELECT_FILTER
} from './type';
import {
    SERVER_URL,
    QUERY_LIMIT,
    DISTANCE_LIMIT
} from '../Api';
import { clearDataCache } from '../actions';

const gasStationFetchAction = (gasStationList) => {
    return {
        type: DATA_FETCH_SUCCESS,
        payload: gasStationList
    };
};

const gasStationFetchError = message => {
    return {
        type: DATA_FETCH_ERROR,
        payload: message
    };
};

export const gasStationFetch = (latitude, longitude, gasType) => {
    return (dispatch) => {
        dispatch(clearDataCache());
        dispatch({ type: DATA_FETCHING });

        return axios.get(`${SERVER_URL}/gas_station/near?lat=${latitude}&lng=${longitude}&type=${gasType}&lim=${QUERY_LIMIT}&dist=${DISTANCE_LIMIT}`).then(
            response => {
                return dispatch(gasStationFetchAction(response.data));
            },
            error => {
                return dispatch(gasStationFetchError(error.request.status));
            });
    };
};

export const areaGasStationFetch = (largeName, middleName, smallName, gasType) => {
    return (dispatch) => {
        dispatch(clearDataCache());
        dispatch({ type: DATA_FETCHING });

        return axios.get(`${SERVER_URL}/searchByArea?cityDo=${largeName}&guGun=${middleName}&dong=${smallName}&type=${gasType}&lim=${QUERY_LIMIT}&dist=${DISTANCE_LIMIT}`).then(
            response => {
                return dispatch(gasStationFetchAction(response.data));
            },
            error => {
                return dispatch(gasStationFetchError(error.request.status));
            });
    };
};

export const selectFilter = (id) => {
    return {
        type: SELECT_FILTER,
        payload: (id === 0) ? 1 : 0
    };
};
