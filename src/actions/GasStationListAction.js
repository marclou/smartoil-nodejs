import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS
} from './type';
import {
    SERVER_URL,
    QUERY_LIMIT,
    DISTANCE_LIMIT
} from '../Api';

export const gasStationFetch = (latitude, longitude) => {
    return (dispatch) => {
        dispatch({ type: DATA_FETCHING });

        return axios.get(`${SERVER_URL}?latitude=${latitude}&longitude=${longitude}&limit=${QUERY_LIMIT}&km=${DISTANCE_LIMIT}`).then(
            response => {
                AsyncStorage.getItem('gasTypePreference').then(
                    value => {
                        if (value !== null) {
                            dispatch({
                                type: DATA_FETCH_SUCCESS,
                                payload: response.data,
                                userGasTypePreference: value
                            });
                        }
                    },
                    error => {
                        dispatch({
                            type: DATA_FETCH_SUCCESS,
                            payload: response.data,
                            userGasTypePreference: 'Gasoline'
                        });
                    });
                },
            error => {
                console.log(error);
            });
    };
};
