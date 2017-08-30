import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-smart-splash-screen';

import { configureStore } from './Store';
import ReduxNavigation from './navigation/ReduxNavigation';
import { COLOR_STATUS_BAR } from './styles/common';

const store = configureStore();

class App extends Component {
    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 0,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={COLOR_STATUS_BAR}
                    barStyle='light-content'
                />
                <Provider store={store}>
                    <ReduxNavigation />
                </Provider>
            </View>
        );
    }
}

export default App;
