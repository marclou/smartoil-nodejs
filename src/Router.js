import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import GasStationList from './components/GasStationList';
import AreaList from './components/AreaList';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene
                onRight={() => Actions.settings()}
                rightTitle="Settings"
                key="main"
                component={Welcome}
                title="Home"
                initial
            />
            <Scene
                key="settings"
                component={SettingsList}
                title="Settings"
            />
            <Scene
                key="result"
                component={GasStationList}
                title="Result"
            />
            <Scene
                onRight={() => Actions.result()}
                rightTitle="Add/Go"
                key="areaList"
                component={AreaList}
                title="District list"
            />

        </Router>
    );
};

export default RouterComponent;
