import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import Result from './components/Result';
import AreaList from './components/AreaList';

const RouterComponent = () => {

    return (
        <Router sceneStyle={{ paddingTop: Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44 }}>
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
                component={Result}
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
