import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import { BackHandler, View, StatusBar } from 'react-native';

import AppNavigation from './AppNavigation';
import Fab from '../components/Fab';

const handleHardwareBack = (props, navigation) => () => {
   const { nav } = props;

   switch (AppNavigation.router.getPathAndParamsForState(nav).path) {
       case 'Initial/Location':
       case 'Main/Home/Prediction':
           BackHandler.exitApp();
           break;
       default:
           return navigation.goBack(null);
   }
};

// manage IOS status bar color depending on the navigation path
const setBarStyle = path => {
    switch (path) {
        case 'Initial/Location':
        case 'Initial/GasType':
        case 'Initial/TankCapacity':
        case 'Main/Favorite/StationDetail':
        case 'Main/Home/Result':
        case 'Main/Home/StationInfo':
        case 'Main/Home/AreaList':
            return 'dark-content';
        default:
            return 'light-content';
    }
};

// here is our redux-aware our smart component
const ReduxNavigation = (props) => {
    const { dispatch, nav } = props;
    const navigation = ReactNavigation.addNavigationHelpers({
        dispatch,
        state: nav
    });
    // Android back button
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBack(props, navigation));

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                barStyle={setBarStyle(AppNavigation.router.getPathAndParamsForState(nav).path)}
            />
            <AppNavigation navigation={navigation} />
            {AppNavigation.router.getPathAndParamsForState(nav).path === 'Main/Home/Prediction'
            && <Fab navigation={navigation} />}
        </View>
    );
};

const mapStateToProps = state => ({ nav: state.nav });

export default connect(mapStateToProps)(ReduxNavigation);
