import React, { Component } from 'react';
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
            <Provider store={store}>
                <ReduxNavigation />
            </Provider>
        );
    }
}

export default App;
