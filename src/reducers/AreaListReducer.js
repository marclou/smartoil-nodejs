import {
    SELECT_AREA,
    SELECT_INDEX,
    CLEAR_CACHE,
    AREAS_FETCHING,
    AREAS_FETCH_SUCCESS,
    AREAS_FETCH_ERROR
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
    error: false,
    errorCode: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AREAS_FETCHING:
            return {
                ...state,
                loading: true
            };
        case AREAS_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                areasList: action.payload
            };
        case AREAS_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.isError,
                errorCode: action.payload.errorCode
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
                loading: true,
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
                error: false,
                errorCode: null
            };
        default: return { ...state };
    }
};
