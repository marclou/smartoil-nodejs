import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import UserReducer from './UserReducers';
import GasStationListReducer from './GasStationListReducer';
import PricePredictionReducer from './PricePredictionReducer';
import SquareButtonCollectionReducer from './SquareButtonCollectionReducer';

export default combineReducers({
    navigationState: NavigationReducer,
    userState: UserReducer,
    gasStationsLibraries: GasStationListReducer,
    pricePrediction: PricePredictionReducer,
    squareButtonCollection: SquareButtonCollectionReducer
});
