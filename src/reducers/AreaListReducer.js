import areaList from '../AreaList.json';

const INITIAL_STATE = {
    loading: false,
    areasList: areaList

};

export default (state = INITIAL_STATE, action) => {
    return { ...state };
};
