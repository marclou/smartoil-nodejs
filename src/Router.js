import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Welcome from './components/Welcome';
import SettingsList from './components/SettingsList';
import Result from './components/Result';
import AreaList from './components/AreaContainer';

const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    return (
        <ConnectedRouter sceneStyle={navBarPadding()} >
            <Scene key='root'>
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
            </Scene>
        </ConnectedRouter>
    );
};

const navBarPadding = () => {
  switch (Platform.OS) {
      case 'ios':
          return { paddingTop: 64 };
      case 'android':
          return { paddingTop: 44 };
      default:
          return { paddingTop: 54 };
  }
};


export default connect()(RouterComponent);
