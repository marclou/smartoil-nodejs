import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Splash from '../components/Splash';
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
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_FONT_QUINARY
} from '../styles/common';
import Styles from '../styles/NavigationStyle';

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
        backgroundColor: COLOR_BACKGROUND_TERCIARY,
    },
});

const SettingsStack = StackNavigator({
    SettingsList: { screen: SettingsList },
    GasSetting: { screen: GasFavoriteList },
    TankSetting: { screen: TankCapacityFavoriteList },
    LocationSetting: { screen: AreaFavoriteList },
    Privacy: {
        screen: TextContainer,
        navigationOptions: {
            title: '정책',
            tabBarVisible: false,
        }
    }
}, {
    initialRouteName: 'SettingsList',
    navigationOptions: {
        headerStyle: Styles.headerBackgroundPrimary,
        headerTitleStyle: Styles.headerTitlePrimary,
        headerTintColor: COLOR_FONT_QUINARY,
        cardStyle: {
            backgroundColor: COLOR_BACKGROUND_QUATERNARY
        }
    }
});

const TabNav = TabNavigator({
    Favorite: { screen: FavoriteStack },
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
}, {
    initialRouteName: 'Home',
    order: ['Favorite', 'Home', 'Settings'],
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    animationEnabled: true,
    lazy: false,
    tabBarOptions: {
        activeTintColor: COLOR_PRIMARY,
        inactiveTintColor: COLOR_BACKGROUND_PRIMARY,
        style: Styles.tabBar,
        labelStyle: Styles.tabBarLabel
    }
});

const AppNav = StackNavigator({
    Initial: { screen: InitialStack },
    Main: { screen: TabNav },
    Splash: { screen: Splash }
}, {
    initialRouteName: 'Splash',
    headerMode: 'none',
    cardStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
    },
});

export default AppNav;
