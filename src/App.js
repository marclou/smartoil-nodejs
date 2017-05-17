import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Router from './Router';
import { configureStore } from './Store';

class App extends Component {
    render() {
        const store = configureStore();

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
