import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import UserReducer from './UserReducers';
import GasStationListReducer from './GasStationListReducer';
import SelectedIDReducer from './SelectedID';
import SelectedFilterReducer from './SelectedFilter';
import PricePredictionReducer from './PricePredictionReducer';
import AreaListReducer from './AreaListReducer';

const gasStationList = combineReducers({
    gasStationsLibraries: GasStationListReducer,
    selectedID: SelectedIDReducer,
    selectedFilter: SelectedFilterReducer
});

export default combineReducers({
    navigationState: NavigationReducer,
    userState: UserReducer,
    gasStationList,
    pricePrediction: PricePredictionReducer,
    areaListReducer: AreaListReducer
});
