import { combineReducers } from 'redux';
import UserReducer from './UserReducers';
import GasStationListReducer from './GasStationListReducer';
import PricePredictionReducer from './PricePredictionReducer';
import SquareButtonCollectionReducer from './SquareButtonCollectionReducer';

export default combineReducers({
    userState: UserReducer,
    gasStationsLibraries: GasStationListReducer,
    pricePrediction: PricePredictionReducer,
    squareButtonCollection: SquareButtonCollectionReducer
});
