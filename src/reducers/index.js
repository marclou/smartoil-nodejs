import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import UserReducer from './UserReducers';
import GasStationListReducer from './GasStationListReducer';
import SelectedIDReducer from './SelectedID';
import SelectedFilterReducer from './SelectedFilter';
import PricePredictionReducer from './PricePredictionReducer';
import AreaListReducer from './AreaListReducer';
import FavoriteStationReducer from './FavoriteStationReducer';
import SelectedFavoriteStationReducer from './SelectedFavoriteStationReducer';

const gasStationList = combineReducers({
    gasStationsLibraries: GasStationListReducer,
    selectedID: SelectedIDReducer,
    selectedFilter: SelectedFilterReducer
});

const favoriteGasStationList = combineReducers({
    favoriteStations: FavoriteStationReducer,
    selectedStation: SelectedFavoriteStationReducer
});

export default combineReducers({
    nav: NavigationReducer,
    userState: UserReducer,
    gasStationList,
    pricePrediction: PricePredictionReducer,
    areaListReducer: AreaListReducer,
    favoriteGasStationList
});
