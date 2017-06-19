import React from 'react';
import { Platform, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { TabIcon, NavIcon, GasTypeSetting, TankCapacitySetting } from './components/functionalComponents';
import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import Result from './components/Result';
import AreaList from './components/AreaContainer';
import FavoriteGasStations from './components/FavoriteGasStations';
import GasStationInfo from './components/GasStationInfo';
import { COLOR_BACKGROUND } from './styles/common';

const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    const { tabBarStyle, navBarStyle, sceneStyle } = styles;

    return (
        <ConnectedRouter>
            <Scene key='root'>
                <Scene key='tabs' tabs={true} tabBarStyle={tabBarStyle} initial>
                    <Scene key="favorite" iconName='heart' icon={TabIcon}>
                        <Scene
                            sceneStyle={sceneStyle}
                            key="areaList"
                            component={FavoriteGasStations}
                            title="Favorites"
                            navigationBarStyle={navBarStyle}
                        />
                    </Scene>
                    <Scene key="home" iconName='home' icon={TabIcon} initial>
                        <Scene
                            sceneStyle={sceneStyle}
                            key="main"
                            component={Welcome}
                            title="홈페이지"
                            initial
                            renderRightButton={() => <NavIcon iconName="share" />}
                            onRight={() => console.log('shared')}
                            navigationBarStyle={navBarStyle}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="result"
                            component={Result}
                            title="결과"
                            navigationBarStyle={[navBarStyle, { borderBottomWidth: 0 }]}
                            hideTabBar
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="gasStationInfo"
                            component={GasStationInfo}
                            navigationBarStyle={navBarStyle}
                            hideTabBar
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="searchArea"
                            component={AreaList}
                            title="Areas"
                            navigationBarStyle={navBarStyle}
                        />
                    </Scene>
                    <Scene key="setting" iconName='cog' icon={TabIcon} >
                        <Scene
                            sceneStyle={sceneStyle}
                            key="settings"
                            component={SettingsList}
                            title="Settings"
                            navigationBarStyle={navBarStyle}
                            initial
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="gasTypeSetting"
                            component={GasTypeSetting}
                            title="Gas Type"
                            navigationBarStyle={navBarStyle}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="tankCapacitySetting"
                            component={TankCapacitySetting}
                            title="Tank Capacity"
                            navigationBarStyle={navBarStyle}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="addArea"
                            component={AreaList}
                            title="Area List"
                            navigationBarStyle={navBarStyle}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="resultList"
                            component={Result}
                            title="Result"
                            navigationBarStyle={navBarStyle}
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
        backgroundColor: COLOR_BACKGROUND,
    },
    navBarStyle: {
        borderBottomWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: COLOR_BACKGROUND,
    },
    sceneStyle: {
        ...Platform.select({
            ios: {
                paddingTop: 64,
            },
            android: {
                paddingTop: 54,
            },
        })
    }
};

export default connect()(RouterComponent);
