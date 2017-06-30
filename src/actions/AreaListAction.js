import areasList from '../FullAreasList.json';
import {
    SELECT_AREA,
    SELECT_INDEX
} from './type';

export const selectArea = (name, type) => {
    return {
        type: SELECT_AREA,
        payload: {
            type: type,
            name: name
        }
    };
};

export const selectIndex = (index, areaSelectedName) => {
    let areaList = [];

    switch (index) {
        case 0:
            areaList = areasList;
            break;
        case 1:
            areaList = areasList.filter((area) => {
                return area.name === areaSelectedName;
            })[0].department;
            break;
        case 2:
            areaList = areasList.filter((area) => {
                return area.name === areaSelectedName;
            })[0].region;
            break;
        default: areaList = null;
    }

    return {
        type: SELECT_INDEX,
        payload: {
            selectedSegment: index,
            areasList: {
                type: 'department',
                data: areaList
            }
        }
    };
};
