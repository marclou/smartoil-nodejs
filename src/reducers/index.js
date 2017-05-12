import { combineReducers } from 'redux';
import GasStationListReducer from './GasStationListReducer';
import SquareButtonReducer from './SquareButtonReducer';
import SquareButtonCollection from './SquareButtonCollection';
import PricePredictionReducer from './PricePredictionReducer';

export default combineReducers({
    gasStationsLibraries: GasStationListReducer,
    pricePrediction: PricePredictionReducer,
    squareButtonState: SquareButtonReducer,
    squareButtonCollectionReducer: SquareButtonCollection
});
