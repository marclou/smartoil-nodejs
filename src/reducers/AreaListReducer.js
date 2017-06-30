import areasList from '../FullAreasList.json';

import {
    SELECT_AREA,
    SELECT_INDEX
} from '../actions/type';

const INITIAL_STATE = {
    selectedSegment: 0,
    selectedAreas: {
        area: null,
        department: null,
        region: null
    },
    areasList: {
        type: 'region',
        data: areasList
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_AREA:
            return {
                ...state,
                selectedAreas: [
                    ...state.selectedAreas,
                    action.payload
                ]
            };
        case SELECT_INDEX:
            return {
                ...state,
                selectedSegment: action.payload.selectedSegment,
                areasList: action.payload.areasList
            };
        default: return { ...state };
    }
};
