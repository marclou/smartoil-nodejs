import SquareButtonReducer, { INITIAL_STATE as SQUARE_BUTTON_INITIAL_STATE } from './SquareButtonReducer';

const INITIAL_STATE = [
    SQUARE_BUTTON_INITIAL_STATE,
    SQUARE_BUTTON_INITIAL_STATE,
    SQUARE_BUTTON_INITIAL_STATE
];

export default (state = INITIAL_STATE, action) => {
    /**
     * This reducer simply return a new array of states with the one called, modified.
     * The others won't change.
     */
    //this.state = [
        /**
         * Create new array with all the SquareButton states from the first state to the one called (excluded).
         */
        //...state.slice(0, action.index),
        /**
         * Call the SquareButton reducer . The state passed is the one indexed at 'action.index'.
         * It returns FETCHING_DATA, ADD_LOCATION_ACTION or RESEARCH_LOCATION_ACTION : the new state of the SquareButton called.
         */
        //SquareButtonReducer(state[action.index], action),
        /**
         * Create new array with all the SquareButton states from the one called (excluded).
         */
        //...state.slice(action.index + 1)
    //];
    return state;
};
