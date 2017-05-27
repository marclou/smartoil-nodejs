import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { TabIcon } from './components/functionalComponents';
import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import Result from './components/Result';
import AreaList from './components/AreaContainer';

const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    return (
        <ConnectedRouter>
            <Scene key='root'>
                <Scene key='tabs' tabs={true} hideNavBar={true} tabBarStyle={styles.tabBarStyle} >
                    <Scene key="home" title="Home" iconName='home' icon={TabIcon}>
                        <Scene
                            sceneStyle={navBarPadding()}
                            key="main"
                            component={Welcome}
                            title="Home"
                            initial
                        />
                        <Scene
                            sceneStyle={navBarPadding()}
                            key="result"
                            component={Result}
                            title="Result"
                        />
                        <Scene
                            sceneStyle={navBarPadding()}
                            key="searchArea"
                            component={AreaList}
                            title="Area List"
                        />
                    </Scene>
                    <Scene key="favorite" title="Favorite" iconName='heart' icon={TabIcon}>
                        <Scene
                            sceneStyle={navBarPadding()}
                            key="areaList"
                            component={AreaList}
                            title="District list"
                            initial
                        />
                    </Scene>
                    <Scene key="setting" title="Settings" iconName='settings' icon={TabIcon} >
                        <Scene
                            sceneStyle={navBarPadding()}
                            key="settings"
                            component={SettingsList}
                            title="Settings"
                            initial
                        />
                        <Scene
                            sceneStyle={navBarPadding()}
                            key="addArea"
                            component={AreaList}
                            title="Area List"
                        />
                        <Scene
                            sceneStyle={navBarPadding()}
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

const navBarPadding = () => {
  switch (Platform.OS) {
      case 'ios':
          return { paddingTop: 64 };
      case 'android':
          return { paddingTop: 54 };
      default:
          return { paddingTop: 54 };
  }
};

const styles = {
    tabBarStyle: {
        borderTopWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: '#F5F5F5',
        opacity: 1,
        height: 60
    }
};

export default connect()(RouterComponent);
