import { combineReducers } from 'redux';
import GasStationListReducer from './GasStationListReducer';
import SquareButtonReducer from './SquareButtonReducer';
import SquareButtonCollection from './SquareButtonCollection';

export default combineReducers({
    gasStationsLibraries: GasStationListReducer,
    squareButtonState: SquareButtonReducer,
    squareButtonCollectionReducer: SquareButtonCollection
});
