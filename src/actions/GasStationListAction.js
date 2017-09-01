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

const comparePrice = (gasStationsList, userTankCapacity) => {
    //gasStationsList.sort(sortByPrice());
    //const highestPrice = gasStationsList.slice(-1)[0].priceInfo.price;
    function getPrice() {
        return gasStationsList.map(d => d.priceInfo.price);
    }
    function getMaxPrice() {
        return Math.max(...getPrice());
    }
    const highestPrice = getMaxPrice();


    gasStationsList.map((gasStation) => {
        const priceDiff = { priceDiff: (highestPrice - gasStation.priceInfo.price) * userTankCapacity };
        return Object.assign(gasStation.priceInfo, priceDiff);
    });
    return gasStationsList;
};

export const gasStationFetch = (latitude, longitude, gasType, userTankCapacity) => {
    return (dispatch) => {
        dispatch(clearDataCache());
        dispatch({ type: DATA_FETCHING });

        return axios.get(`${SERVER_URL}/gas_station/near?lat=${latitude}&lng=${longitude}&type=${gasType}&lim=${QUERY_LIMIT}&dist=${DISTANCE_LIMIT}`).then(
            response => {
                return dispatch(gasStationFetchAction(comparePrice(response.data, userTankCapacity)));
            },
            error => {
                return dispatch(gasStationFetchError(error.request.status));
            });
    };
};

export const areaGasStationFetch = (largeName, middleName, smallName, gasType, userTankCapacity) => {
    return (dispatch) => {
        dispatch(clearDataCache());
        dispatch({ type: DATA_FETCHING });

        return axios.get(`${SERVER_URL}/searchByArea?cityDo=${largeName}&guGun=${middleName}&dong=${smallName}&type=${gasType}&lim=${QUERY_LIMIT}&dist=${DISTANCE_LIMIT}`).then(
            response => {
                return dispatch(gasStationFetchAction(comparePrice(response.data, userTankCapacity)));
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
