import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import UserReducer from './UserReducers';
import GasStationListReducer from './GasStationListReducer';
import SelectedIDReducer from './SelectedID';
import PricePredictionReducer from './PricePredictionReducer';
import SquareButtonCollectionReducer from './SquareButtonCollectionReducer';
import AreaListReducer from './AreaListReducer';

const gasStationList = combineReducers({
    gasStationsLibraries: GasStationListReducer,
    selectedID: SelectedIDReducer,
});

export default combineReducers({
    navigationState: NavigationReducer,
    userState: UserReducer,
    gasStationList,
    pricePrediction: PricePredictionReducer,
    squareButtonCollection: SquareButtonCollectionReducer,
    areaListReducer: AreaListReducer
});
