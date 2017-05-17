import { combineReducers } from 'redux';
import GasStationListReducer from './GasStationListReducer';
import SquareButtonReducer from './SquareButtonReducer';
import SquareButtonCollection from './SquareButtonCollection';
import PricePredictionReducer from './PricePredictionReducer';

const squareButton = combineReducers({
    squareButtonCollectionReducer: SquareButtonCollection,
    squareButtonState: SquareButtonReducer
});

export default combineReducers({
    gasStationsLibraries: GasStationListReducer,
    pricePrediction: PricePredictionReducer,
    squareButton
});
