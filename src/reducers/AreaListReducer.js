import areasList from '../FullAreasList.json';

import {
    SELECT_AREA,
    SELECT_INDEX,
    CLEAR_CACHE
} from '../actions/type';

const INITIAL_STATE = {
    selectedSegment: 0,
    selectedAreas: {
        area: null,
        department: null,
        region: null
    },
    areasList: areasList
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_AREA:
            switch (action.payload.index) {
                case 0:
                    return {
                        ...state,
                        selectedSegment: action.payload.selectedSegment,
                        selectedAreas: {
                            ...state.selectedAreas,
                            area: action.payload.name
                        },
                        areasList: action.payload.areasList
                    };
                case 1:
                    return {
                        ...state,
                        selectedSegment: action.payload.selectedSegment,
                        selectedAreas: {
                            ...state.selectedAreas,
                            department: action.payload.name
                        },
                        areasList: action.payload.areasList
                    };
                case 2:
                    return {
                        ...state,
                        selectedSegment: action.payload.selectedSegment,
                        selectedAreas: {
                            ...state.selectedAreas,
                            region: action.payload.name
                        },
                        areasList: action.payload.areasList
                    };
                default: break;
            }
            break;
        case SELECT_INDEX:
            return {
                ...state,
                selectedSegment: action.payload.selectedSegment,
                areasList: action.payload.areasList
            };
        case CLEAR_CACHE:
            return {
                ...state,
                selectedSegment: 0,
                selectedAreas: {
                    area: null,
                    department: null,
                    region: null
                },
                areasList: areasList
            };
        default: return { ...state };
    }
};
