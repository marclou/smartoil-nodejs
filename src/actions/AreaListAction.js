import { Alert } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

import {
    SELECT_AREA,
    SELECT_INDEX,
    CLEAR_CACHE,
    AREAS_FETCHING,
    AREAS_FETCH_SUCCESS,
    AREAS_FETCH_ERROR
} from './type';
import { SERVER_URL } from '../Api';

const fetchSuccess = data => {
    return {
        type: AREAS_FETCH_SUCCESS,
        payload: data
    };
};

const fetchError = errorStatus => {
    return {
        type: AREAS_FETCH_ERROR,
        payload: {
            isError: true,
            errorCode: errorStatus
        }
    };
};

export const changeDataSource = (index, ...areaSelected) => {
    return (dispatch) => {
        switch (index) {
            case 0:
                dispatch({ type: AREAS_FETCHING });

                return axios.get(`${SERVER_URL}/region`).then(
                    response => {
                        return dispatch(fetchSuccess(response.data));
                    },
                    error => {
                        return dispatch(fetchError(error.request.status));
                    });
            case 1:
                if (areaSelected[0].area !== null) {
                    dispatch({ type: AREAS_FETCHING });

                    return axios.get(`${SERVER_URL}/district?largeCode=${areaSelected[0].area.largeCode}`).then(
                        response => {
                            return dispatch(fetchSuccess(response.data));
                        },
                        error => {
                            return dispatch(fetchError(error.request.status));
                        });
                }
                displayAlert();
                break;
            case 2:
                if (areaSelected[0].area !== null && areaSelected[0].department !== null) {
                    dispatch({ type: AREAS_FETCHING });

                    return axios.get(`${SERVER_URL}/block?largeCode=${areaSelected[0].area.largeCode}&middleCode=${areaSelected[0].department.middleCode}`).then(
                        response => {
                            return dispatch(fetchSuccess(response.data));
                        },
                        error => {
                            return dispatch(fetchError(error.request.status));
                        });
                }
                displayAlert();
                break;
            default:
                break;
        }
    };
};

export const selectArea = (area, index) => {
    return (dispatch) => {
        dispatch({ type: SELECT_AREA, payload: area });
        switch (index) {
            case 0:
            case 1:
                dispatch({ type: SELECT_INDEX, payload: index + 1 });
                break;
            case 2:
                dispatch(NavigationActions.navigate({
                    routeName: 'Result',
                    params: { isFromAreaList: true }
                }));
                break;
            default: break;
        }
    };
};

export const selectIndex = (index, ...areaSelected) => {
    return (dispatch) => {
        switch (index) {
            case 0:
                dispatch({ type: SELECT_INDEX, payload: index });
                break;
                //return dispatch(changeDataSource(index, areaSelected));
            case 1:
                if (areaSelected[0].area !== null) {
                    dispatch({ type: SELECT_INDEX, payload: index });
                    break;
                    //return dispatch(changeDataSource(index, areaSelected[0]));
                }
                displayAlert();
                break;
            case 2:
                if (areaSelected[0].area !== null && areaSelected[0].department !== null) {
                    dispatch({ type: SELECT_INDEX, payload: index });
                    break;
                    //return dispatch(changeDataSource(index, areaSelected[0], areaSelected[0]));
                }
                displayAlert();
                break;
            default:
        }
    };
};

const displayAlert = () => {
    Alert.alert(
        'Alert',
        'You have to choose one area',
        [
            { text: 'OK' }
        ],
        { cancelable: true }
    );
};
