import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Location from '../components/initialComponent/Location';
import GasType from '../components/initialComponent/GasType';
import TankCapacity from '../components/initialComponent/TankCapacity';
import FavoriteGasStations from '../components/FavoriteGasStations';
import GasStationContainer from '../components/GasStationContainer';
import HomeScreen from '../components/HomeScreen';
import AreaList from '../components/AreaList';
import Result from '../components/Result';
import SettingsList from '../components/SettingsList';
import GasFavoriteList from '../components/GasFavoriteList';
import TankCapacityFavoriteList from '../components/TankCapacityFavoriteList';
import AreaFavoriteList from '../components/AreaFavoriteList';
import { TextContainer } from '../components/functionalComponents';
import {
    COLOR_PRIMARY,
    COLOR_BACKGROUND_PRIMARY,
    COLOR_BACKGROUND_TERCIARY,
    COLOR_BACKGROUND_QUATERNARY
} from '../styles/common';
import styles from '../styles/NavigationStyle';

const InitialStack = StackNavigator({
    Location: { screen: Location },
    GasType: { screen: GasType },
    TankCapacity: { screen: TankCapacity },
}, {
    initialRouteName: 'Location',
    headerMode: 'none',
    cardStyle: {
        paddingTop: 80,
        backgroundColor: COLOR_BACKGROUND_TERCIARY
    },
});

const FavoriteStack = StackNavigator({
    FavoriteList: { screen: FavoriteGasStations },
    StationDetail: { screen: GasStationContainer }
}, {
    initialRouteName: 'FavoriteList',
    cardStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY
    },
});

const HomeStack = StackNavigator({
    Prediction: { screen: HomeScreen },
    AreaList: { screen: AreaList },
    Result: { screen: Result },
    StationInfo: { screen: GasStationContainer }

}, {
    initialRouteName: 'Prediction',
    cardStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY
    },
});

const SettingsStack = StackNavigator({
    SettingsList: { screen: SettingsList },
    GasSetting: { screen: GasFavoriteList },
    TankSetting: { screen: TankCapacityFavoriteList },
    LocationSetting: { screen: AreaFavoriteList },
    Privacy: { screen: TextContainer }
}, {
    initialRouteName: 'SettingsList',
});

const TabNav = TabNavigator({
    Favorite: { screen: FavoriteStack },
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
}, {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    tabBarOptions: {
        activeTintColor: COLOR_PRIMARY,
        inactiveTintColor: COLOR_BACKGROUND_PRIMARY,
        style: styles.tabBar,
        labelStyle: styles.tabBarLabel
    }
});

const AppNav = StackNavigator({
    Initial: { screen: InitialStack },
    Main: { screen: TabNav },
}, {
    initialRouteName: 'Main',
    headerMode: 'none',
});

export default AppNav;
