import React from 'react';
import { Platform, Image } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Location from './components/initialComponent/Location';
import GasType from './components/initialComponent/GasType';
import TankCapacity from './components/initialComponent/TankCapacity';
import { TabIcon, NavIcon, BackButton, Blur } from './components/functionalComponents';
import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import Result from './components/Result';
import AreaList from './components/AreaList';
import FavoriteGasStations from './components/FavoriteGasStations';
import GasStationInfo from './components/GasStationInfo';
import GasFavoriteList from './components/GasFavoriteList';
import TankCapacityFavoriteList from './components/TankCapacityFavoriteList';
import AreaFavoriteList from './components/AreaFavoriteList';
import {
    COLOR_PRIMARY,
    COLOR_FONT_SECONDARY,
    COLOR_FONT_QUINARY,
    COLOR_BACKGROUND_TERCIARY,
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_BORDER_PRIMARY,
    COLOR_BORDER_SECONDARY
} from './styles/common';

const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    const { sliderSceneStyle, sliderNavBarStyle, tabBarStyle, navBarStylePrimary, navBarStyle, titleStyle, sceneStyle } = styles;

    return (
        <ConnectedRouter>
            <Scene key='root'>
                <Scene key="slider" initial>
                    <Scene
                        key="location"
                        component={Location}
                        sceneStyle={sliderSceneStyle}
                        navigationBarStyle={sliderNavBarStyle}
                        initial
                    />
                    <Scene
                        key="gasType"
                        component={GasType}
                        sceneStyle={sliderSceneStyle}
                        navigationBarStyle={sliderNavBarStyle}
                        renderBackButton={() => <BackButton color={COLOR_FONT_SECONDARY} />}
                    />
                    <Scene
                        key="tankCapacity"
                        component={TankCapacity}
                        sceneStyle={sliderSceneStyle}
                        navigationBarStyle={sliderNavBarStyle}
                        renderBackButton={() => <BackButton color={COLOR_FONT_SECONDARY} />}
                    />
                </Scene>
                <Scene key='tabs' tabs={true} tabBarStyle={tabBarStyle} initial={true}>
                    <Scene key="favorite" iconName='heart' icon={TabIcon} titleStyle={{ fontSize: 20 }}>
                        <Scene
                            sceneStyle={sceneStyle}
                            key="areaList"
                            component={FavoriteGasStations}
                            title="단골주유소"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
                        />
                    </Scene>
                    <Scene key="home" iconName='home' initial icon={TabIcon} titleStyle={{ fontSize: 20 }} >
                        <Scene
                            sceneStyle={sceneStyle}
                            key="main"
                            component={Welcome}
                            navigationBarTitleImage={require('./img/icon/logo_type_white.png')}
                            navigationBarTitleImageStyle={{ height: 22, width: 110, resizeMode: 'stretch' }}
                            initial
                            renderRightButton={() => <NavIcon iconName="share" color={COLOR_FONT_QUINARY} />}
                            rightButtonStyle={{ flexDirection: 'row' }}
                            navigationBarStyle={[navBarStylePrimary, { borderBottomWidth: 0 }]}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="result"
                            component={Result}
                            renderBackButton={() => <BackButton color={COLOR_FONT_SECONDARY} />}
                            title="결과"
                            navigationBarStyle={[navBarStyle, { borderBottomWidth: 0 }]}
                            hideTabBar
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="gasStationInfo"
                            component={GasStationInfo}
                            renderBackButton={() => <BackButton color={COLOR_FONT_SECONDARY} />}
                            navigationBarStyle={navBarStyle}
                            hideTabBar
                        />
                        <Scene
                            sceneStyle={[sceneStyle, { backgroundColor: COLOR_BACKGROUND_TERCIARY }]}
                            key="searchArea"
                            component={AreaList}
                            renderBackButton={() => <BackButton color={COLOR_FONT_SECONDARY} />}
                            title="Areas"
                            navigationBarStyle={[navBarStyle, { borderBottomWidth: 0 }]}
                        />
                    </Scene>
                    <Scene key="setting" iconName='cog' icon={TabIcon} titleStyle={{ fontSize: 20 }}>
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
                            renderBackButton={() => <BackButton color={COLOR_FONT_QUINARY} />}
                            title="기름 종류"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
                        />
                        <Scene
                            sceneStyle={sceneStyle}
                            key="tankCapacitySetting"
                            component={TankCapacityFavoriteList}
                            renderBackButton={() => <BackButton color={COLOR_FONT_QUINARY} />}
                            title="리터량"
                            titleStyle={titleStyle}
                            navigationBarStyle={navBarStylePrimary}
                        />
                        <Scene
                            sceneStyle={[sceneStyle, { backgroundColor: COLOR_BACKGROUND_TERCIARY }]}
                            key="favoriteArea"
                            component={AreaFavoriteList}
                            renderBackButton={() => <BackButton color={COLOR_FONT_QUINARY} />}
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
    sliderSceneStyle: {
        paddingTop: 50
    },
    sliderNavBarStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0
    },
    tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: COLOR_BORDER_SECONDARY,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY
    },
    navBarStyle: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR_BORDER_PRIMARY,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
    },
    navBarStylePrimary: {
        backgroundColor: COLOR_PRIMARY
    },
    titleStyle: {
        color: COLOR_FONT_QUINARY
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
