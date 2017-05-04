import axios from 'axios';
import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS
} from './type';

export const gasStationFetch = (latitude, longitude) => {
    return (dispatch) => {
        axios.get(`https://v703gz8sne.execute-api.ap-northeast-2.amazonaws.com/beta/find?latitude=${latitude}&longitude=${longitude}`)
            .then(response => {
                dispatch({ type: DATA_FETCH_SUCCESS, payload: response.data });
            });
    };
};
