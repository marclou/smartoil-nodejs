import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './Store';
import ReduxNavigation from './navigation/ReduxNavigation';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ReduxNavigation />
            </Provider>
        );
    }
}

export default App;
