import { combineReducers } from 'redux';
import GasStationListReducer from './GasStationListReducer';
import PricePredictionReducer from './PricePredictionReducer';
import SquareButtonCollectionReducer from './SquareButtonCollectionReducer';

export default combineReducers({
    gasStationsLibraries: GasStationListReducer,
    pricePrediction: PricePredictionReducer,
    squareButtonCollection: SquareButtonCollectionReducer
});
