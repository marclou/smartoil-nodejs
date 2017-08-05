import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import areasList from '../FullAreasList.json';
import {
    SELECT_AREA,
    SELECT_INDEX,
    CLEAR_CACHE,
    ERROR_NO_LOG,
    DATA_FETCHING,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR
} from './type';
import { SERVER_URL } from '../Api';

const fetchSuccess = data => {
    return {
        type: DATA_FETCH_SUCCESS,
        payload: data
    };
};

const fetchError = error => {
    return {
        type: DATA_FETCH_ERROR,
        payload: error
    };
};

export const changeDataSource = (index, ...areaSelected) => {
    return (dispatch) => {
        dispatch({ type: DATA_FETCHING });

        switch (index) {
            case 0:
                return axios.get(`${SERVER_URL}/region`).then(
                    response => {
                        return dispatch(fetchSuccess(response.data));
                    },
                    error => {
                        return dispatch(fetchError(error.request.status));
                    });
            case 1:
                if (areaSelected.area !== null) {
                    return axios.get(`${SERVER_URL}/district?largeCode=${areaSelected.area.code}`).then(
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
                if (areaSelected.area.name !== null && areaSelected.department.name !== null) {
                    return axios.get(`${SERVER_URL}/block?largeCode=${areaSelected.area.code}&middleCode=${areaSelected.department.code}`).then(
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

export const selectArea = area => {
    return {
        type: SELECT_AREA,
        payload: area
    };
};

export const selectIndex = index => {
    return {
        type: SELECT_INDEX,
        payload: index
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

/*export const selectArea = (index, name, selectedAreas) => {
 let areaList = [];

 switch (index) {
 case 0:
 areaList = changeDataSource(index + 1, name);
 break;
 case 1:
 areaList = changeDataSource(index + 1, selectedAreas.area, name);
 break;
 case 2:
 Actions.result();
 return {
 type: CLEAR_CACHE
 };
 default: break;
 }

 return {
 type: SELECT_AREA,
 payload: {
 selectedSegment: index + 1,
 index: index,
 name: name,
 areasList: areaList
 }
 };
 };

 export const selectIndex = (index, areaSelected) => {
 let areaList = [];
 let invalid = null;

 switch (index) {
 case 0:
 areaList = changeDataSource(index);
 break;
 case 1:
 if (areaSelected.area === null) {
 invalid = true;
 break;
 }
 areaList = changeDataSource(index, areaSelected.area);
 break;
 case 2:
 if (areaSelected.area === null || areaSelected.department === null) {
 invalid = true;
 break;
 }
 areaList = changeDataSource(index, areaSelected.area, areaSelected.department);
 break;
 default: break;
 }

 if (invalid) {
 displayAlert();
 return {
 type: ERROR_NO_LOG
 };
 }
 return {
 type: SELECT_INDEX,
 payload: {
 selectedSegment: index,
 areasList: areaList
 }
 };
 };

 const changeDataSource = (index, ...areaSelected) => {
 let areaList = [];
 let departmentList = [];

 switch (index) {
 case 0:
 areaList = areasList;
 break;
 case 1:
 areaList = areasList.filter((area) => {
 return area.name === areaSelected[0];
 })[0].department;
 break;
 case 2:
 departmentList = areasList.filter(area => {
 return area.name === areaSelected[0];
 })[0].department;
 areaList = departmentList.filter(area => {
 return area.name === areaSelected[1];
 })[0].region;
 break;
 default: areaList = areasList;
 }
 return areaList;
 };*/
