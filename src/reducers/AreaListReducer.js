import areasList from '../FullAreasList.json';

import {
    SELECT_AREA,
    SELECT_INDEX,
    CLEAR_CACHE,
    DATA_FETCHING,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR
} from '../actions/type';

const INITIAL_STATE = {
    selectedSegment: 0,
    selectedAreas: {
        area: null,
        department: null,
        region: null
    },
    areasList: [],
    loading: true,
    error: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /*case SELECT_AREA:
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
            break;*/
        case DATA_FETCHING:
            return {
                ...state,
                loading: true
            };
        case DATA_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                areasList: action.payload
            };
        case DATA_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SELECT_AREA:
            switch (action.payload.areaDepth) {
                case 'L':
                    return {
                        ...state,
                        selectedAreas: {
                            ...state.selectedAreas,
                            area: action.payload
                        }
                    };
                case 'M':
                    return {
                        ...state,
                        selectedAreas: {
                            ...state.selectedAreas,
                            department: action.payload
                        }
                    };
                case 'S':
                    return {
                        ...state,
                        selectedAreas: {
                            ...state.selectedAreas,
                            region: action.payload
                        }
                    };
                default:
                    break;
            }
            break;
        case SELECT_INDEX:
            return {
                ...state,
                selectedSegment: action.payload
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
                areasList: [],
                loading: true,
                error: false
            };
        default: return { ...state };
    }
};
