import React from 'react';
import { Platform, Navigator } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { TabIcon, GasTypeSetting, TankCapacitySetting } from './components/functionalComponents';
import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import Result from './components/Result';
import AreaList from './components/AreaContainer';
import FavoriteGasStations from './components/FavoriteGasStations';

const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    const { tabBarStyle, sceneStyle } = styles;
    return (
        <ConnectedRouter>
            <Scene key='root'>
                <Scene key='tabs' tabs={true} tabBarStyle={tabBarStyle} >
                    <Scene key="favorite" title="Favorite" iconName='heart' icon={TabIcon}>
                        <Scene
                            sceneStyle={sceneStyle}
                            key="areaList"
                            component={FavoriteGasStations}
                            title="Favorites"
                        />
                    </Scene>
                    <Scene key="home" title="Home" iconName='home' icon={TabIcon} initial>
                        <Scene
                            sceneStyle={sceneStyle}
                            key="main"
                            component={Welcome}
                            title="Home"
                            initial
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="result"
                            component={Result}
                            title="Result"
                            hideTabBar
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="searchArea"
                            component={AreaList}
                            title="Areas"
                        />
                    </Scene>
                    <Scene key="setting" title="Settings" iconName='settings' icon={TabIcon} >
                        <Scene
                            sceneStyle={sceneStyle}
                            key="settings"
                            component={SettingsList}
                            title="Settings"
                            initial
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="gasTypeSetting"
                            component={GasTypeSetting}
                            title="Gas Type"
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="tankCapacitySetting"
                            component={TankCapacitySetting}
                            title="Tank Capacity"
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="addArea"
                            component={AreaList}
                            title="Area List"
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="resultList"
                            component={Result}
                            title="Result"
                        />
                    </Scene>
                </Scene>
            </Scene>
        </ConnectedRouter>
    );
};

const styles = {
    tabBarStyle: {
        borderTopWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: '#F5F5F5',
        opacity: 1,
        height: 60
    },
    sceneStyle: {
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
        /*...Platform.select({
            ios: {
                paddingTop: 64,
            },
            android: {
                paddingTop: 54,
            },
        })*/
    }
};

export default connect()(RouterComponent);
