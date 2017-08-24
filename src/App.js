import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-smart-splash-screen';

import { configureStore } from './Store';
import ReduxNavigation from './navigation/ReduxNavigation';

const store = configureStore();

class App extends Component {
    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='#4270d2'
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
