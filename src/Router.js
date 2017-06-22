import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { TabIcon, NavIcon, BackButton } from './components/functionalComponents';
import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import Result from './components/Result';
import AreaList from './components/AreaContainer';
import FavoriteGasStations from './components/FavoriteGasStations';
import GasStationInfo from './components/GasStationInfo';
import GasFavoriteList from './components/GasFavoriteList';
import TankCapacityFavoriteList from './components/TankCapacityFavoriteList';
import AreaFavoriteList from './components/AreaFavoriteList';
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY, COLOR_BACKGROUND, COLOR_NAV_BACKGROUND } from './styles/common';

const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    const { tabBarStyle, navBarStylePrimary, navBarStyle, titleStyle, sceneStyle } = styles;

    return (
        <ConnectedRouter>
            <Scene key='root'>
                <Scene key='tabs' tabs={true} tabBarStyle={tabBarStyle} initial>
                    <Scene key="favorite" iconName='heart' icon={TabIcon}>
                        <Scene
                            sceneStyle={sceneStyle}
                            key="areaList"
                            component={FavoriteGasStations}
                            title="단골주유소"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
                        />
                    </Scene>
                    <Scene key="home" iconName='home' icon={TabIcon} initial>
                        <Scene
                            sceneStyle={sceneStyle}
                            key="main"
                            component={Welcome}
                            title="홈페이지"
                            titleStyle={titleStyle}
                            initial
                            renderRightButton={() => <NavIcon iconName="share" color={COLOR_BACKGROUND} />}
                            rightButtonStyle={{ flexDirection: 'row' }}
                            onRight={() => console.log('shared')}
                            navigationBarStyle={navBarStylePrimary}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="result"
                            component={Result}
                            renderBackButton={() => <BackButton color={COLOR_TEXT_SECONDARY} />}
                            title="결과"
                            navigationBarStyle={[navBarStyle, { borderBottomWidth: 0 }]}
                            hideTabBar
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="gasStationInfo"
                            component={GasStationInfo}
                            renderBackButton={() => <BackButton color={COLOR_TEXT_SECONDARY} />}
                            navigationBarStyle={navBarStyle}
                            hideTabBar
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="searchArea"
                            component={AreaList}
                            renderBackButton={() => <BackButton color={COLOR_TEXT_SECONDARY} />}
                            title="Areas"
                            navigationBarStyle={navBarStyle}
                        />
                    </Scene>
                    <Scene key="setting" iconName='cog' icon={TabIcon} >
                        <Scene
                            sceneStyle={sceneStyle}
                            key="settings"
                            component={SettingsList}
                            title="설정"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
                            initial
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="gasTypeSetting"
                            component={GasFavoriteList}
                            renderBackButton={() => <BackButton color={COLOR_NAV_BACKGROUND} />}
                            title="기름 종류"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="tankCapacitySetting"
                            component={TankCapacityFavoriteList}
                            renderBackButton={() => <BackButton color={COLOR_NAV_BACKGROUND} />}
                            title="리터량"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="favoriteArea"
                            component={AreaFavoriteList}
                            renderBackButton={() => <BackButton color={COLOR_NAV_BACKGROUND} />}
                            title="지역"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
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
        backgroundColor: COLOR_NAV_BACKGROUND,
    },
    navBarStyle: {
        borderBottomWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: COLOR_NAV_BACKGROUND,
    },
    navBarStylePrimary: {
        borderBottomWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: COLOR_PRIMARY,
    },
    titleStyle: {
        color: COLOR_NAV_BACKGROUND
    },
    sceneStyle: {
        backgroundColor: COLOR_BACKGROUND,
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
