import { AsyncStorage } from 'react-native';
import {
    SQUARE_BUTTON_FETCHING_SUCCESS
} from './type';

export const fetchingButtons = () => {
    return (dispatch) => {
        AsyncStorage.getItem('SquareButtons', (err, result) => {
            setTimeout(() => {
                dispatch(fetchingSuccess(JSON.parse(result)));
            }, 1000);
        });
    };
};

const fetchingSuccess = (result) => {
    return {
        type: SQUARE_BUTTON_FETCHING_SUCCESS,
        payload: result
    };
};

