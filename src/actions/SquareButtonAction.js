import { AsyncStorage } from 'react-native';
import {
    SQUARE_BUTTON_FETCHING_SUCCESS
} from './type';

const fetchingSuccess = (result) => {
    return {
        type: SQUARE_BUTTON_FETCHING_SUCCESS,
        payload: result
    };
};

export const fetchingButtons = () => {
    return (dispatch) => {
        AsyncStorage.getItem('SquareButtons', (err, result) => {
            dispatch(fetchingSuccess(JSON.parse(result)));
        });
    };
};
