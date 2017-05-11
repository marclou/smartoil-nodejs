import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {
    DATA_FETCHING,
    DATA_FETCH_SUCCESS
} from './type';

export const gasStationFetch = (latitude, longitude) => {
    return (dispatch) => {
        dispatch({ type: DATA_FETCHING });

        axios.get(`https://v703gz8sne.execute-api.ap-northeast-2.amazonaws.com/beta/find?latitude=${latitude}&longitude=${longitude}&limit=10&km=5`)
            .then(response => {
                AsyncStorage.getItem('gasTypePreference').then((value) => {
                    if (value !== null) {
                        dispatch({ type: DATA_FETCH_SUCCESS, payload: response.data, userGasTypePreference: value });
                    }
                }).catch(() => {
                    dispatch({ type: DATA_FETCH_SUCCESS, payload: response.data, userGasTypePreference: 'Gasoline' });
                });
            }).catch(error => {
                console.log(error);
        });
    };
};
