import areasList from '../FullAreasList.json';

const INITIAL_STATE = {
    loading: false,
    selectedSegment: 0,
    selectedAreas: [
        { region: null },
        { department: null },
        { district: null }
    ],
    areasList: areasList

};

export default (state = INITIAL_STATE, action) => {
    return { ...state };
};
